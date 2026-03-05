#!/usr/bin/env python3
"""
excel_to_sql_empleados.py

Convierte un Excel (.xlsx) a un archivo .sql con sentencias INSERT (MySQL/MariaDB).

CAMBIO PRINCIPAL:
- NO asigna IDs automáticos.
- Migra el Id EXACTO que viene en el Excel.
- Si el Id viene vacío/'-'/'nan' o no es numérico -> ERROR (para evitar insertar algo incorrecto).

Ejecución rápida:
  python excel_to_sql_empleados.py

(ajusta los DEFAULTS abajo: EXCEL_DEFAULT, OUT_DEFAULT, etc.)
"""

from __future__ import annotations

import argparse
import datetime as _dt
import math
import re
from pathlib import Path

import pandas as pd


# =========================
# DEFAULTS (AJUSTA AQUÍ)
# =========================
# Rutas relativas a la carpeta donde está este script (Frontera/)
_SCRIPT_DIR = Path(__file__).resolve().parent
EXCEL_DEFAULT = _SCRIPT_DIR / "Empleados.xlsx"   # <-- tu archivo
OUT_DEFAULT = _SCRIPT_DIR / "empleados_inserts.sql"  # <-- salida
SCHEMA_DEFAULT = ""                       # opcional: "empleados_db.sql"
TABLE_DEFAULT = "empleados"
SHEET_DEFAULT = 0
BATCH_SIZE_DEFAULT = 500
ID_COLUMN_DEFAULT = "Id"
USE_DB_DEFAULT = ""                       # opcional: "empleados_db"


def _norm_key(s: str) -> str:
    s = str(s).strip().lower()
    s = s.replace("\n", "_")
    s = re.sub(r"\s+", "_", s)
    s = re.sub(r"[^a-z0-9_]+", "", s)
    s = re.sub(r"_+", "_", s).strip("_")
    return s


def parse_table_columns_from_schema(schema_sql: str, table: str) -> list[str]:
    m = re.search(rf"CREATE TABLE `{re.escape(table)}`\s*\((.*?)\)\s*ENGINE=", schema_sql, re.S | re.I)
    if not m:
        return []
    body = m.group(1)
    return re.findall(r"`([^`]+)`\s+[a-zA-Z]+", body)


def sql_literal_mysql(val) -> str:
    """Convierte un valor a literal SQL (MySQL/MariaDB)."""
    if val is None:
        return "NULL"
    if isinstance(val, float) and math.isnan(val):
        return "NULL"

    s = str(val).strip()
    if s == "" or s == "-" or s.lower() == "nan":
        return "NULL"

    # escapes básicos MySQL/MariaDB
    s = s.replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"


def coerce_int_strict(v, row_idx: int, col_name: str) -> int:
    """
    Convierte a int de forma estricta:
    - vacío / '-' / nan => ERROR
    - no numérico => ERROR
    - '12.0' => 12 (acepta floats que sean enteros)
    """
    if v is None:
        raise ValueError(f"Fila {row_idx}: {col_name} está vacío (None).")

    s = str(v).strip()
    if s == "" or s == "-" or s.lower() == "nan":
        raise ValueError(f"Fila {row_idx}: {col_name} está vacío/'-'/'nan' y este script NO genera IDs.")

    # Permite "12" o "12.0" (pero no "12.5")
    try:
        f = float(s)
    except Exception:
        raise ValueError(f"Fila {row_idx}: {col_name}='{s}' no es numérico.")

    if not f.is_integer():
        raise ValueError(f"Fila {row_idx}: {col_name}='{s}' no es un entero válido.")

    return int(f)


def generate_inserts(
    df: pd.DataFrame,
    table: str,
    columns: list[str],
    batch_size: int = 500,
    id_column: str = "Id",
    on_duplicate: str = "ignore",
) -> str:
    """on_duplicate: 'error' | 'ignore' | 'replace'."""
    col_sql = ", ".join(f"`{c}`" for c in columns)
    out_lines: list[str] = []

    if on_duplicate == "ignore":
        insert_cmd = "INSERT IGNORE INTO"
    elif on_duplicate == "replace":
        insert_cmd = "REPLACE INTO"
    else:
        insert_cmd = "INSERT INTO"

    for start in range(0, len(df), batch_size):
        chunk = df.iloc[start:start + batch_size]
        rows = []
        for i, (_, row) in enumerate(chunk.iterrows()):
            # Índice real (1-based) para mensajes de error más humanos
            row_num = int(chunk.index[i]) + 2  # +2: asumiendo encabezado en Excel (aprox). Ajusta si prefieres.
            vals = []
            for c in columns:
                if c == id_column:
                    vals.append(str(coerce_int_strict(row[c], row_num, id_column)))
                else:
                    vals.append(sql_literal_mysql(row[c]))
            rows.append("(" + ", ".join(vals) + ")")

        out_lines.append(f"{insert_cmd} `{table}` ({col_sql}) VALUES\n" + ",\n".join(rows) + ";\n")

    return "\n".join(out_lines)


def main():
    ap = argparse.ArgumentParser(description="Convierte Excel a .sql con INSERTs (MySQL/MariaDB).")

    # Defaults para poder correr: python excel_to_sql_empleados.py
    ap.add_argument("--excel", default=EXCEL_DEFAULT, help="Ruta del archivo Excel .xlsx")
    ap.add_argument("--out", default=OUT_DEFAULT, help="Ruta del archivo .sql de salida")
    ap.add_argument("--schema", default=SCHEMA_DEFAULT, help="(Opcional) Dump .sql para leer columnas/orden de la tabla")
    ap.add_argument("--table", default=TABLE_DEFAULT, help="Nombre de la tabla destino")
    ap.add_argument("--sheet", default=SHEET_DEFAULT, help="Hoja del Excel (nombre o índice). Default: 0 (primera)")
    ap.add_argument("--batch-size", type=int, default=BATCH_SIZE_DEFAULT, help="Filas por INSERT multi-row")
    ap.add_argument("--id-column", default=ID_COLUMN_DEFAULT, help="Nombre de la columna ID en la tabla (default: Id)")
    ap.add_argument("--use-db", default=USE_DB_DEFAULT, help="(Opcional) Inserta 'USE `db`;' en el archivo de salida")
    ap.add_argument(
        "--on-duplicate",
        choices=("error", "ignore", "replace"),
        default="ignore",
        help="Si el Id ya existe: error=fallar, ignore=omitir fila, replace=sobrescribir (default: ignore)",
    )

    args = ap.parse_args()

    excel_path = Path(args.excel)
    if not excel_path.exists():
        raise SystemExit(f"No existe el Excel: {excel_path}")

    # Leer todo como texto para no perder ceros a la izquierda en otros campos
    df_raw = pd.read_excel(excel_path, sheet_name=args.sheet, dtype=str)

    # Mapeo (ajústalo si cambian los encabezados del Excel)
    excel_to_db = {
        "id": "Id",
        "nombre_completo": "nombre",
        "cargo": "cargo",
        "numero_telefonico": "numero_telefonico",
        "tipo_de_sangre": "tipo_sangre",
        "arl": "arl",
        "email": "email",
        "compania": "compania",
        "telefono_empresa": "telefono_empresa",
        "telefono_internacional": "telefono_internacional",
        "imageurl": "imageUrl",
    }

    df_raw.columns = [_norm_key(c) for c in df_raw.columns]
    df = df_raw.rename(columns={k: v for k, v in excel_to_db.items() if k in df_raw.columns})

    # Orden de columnas
    if args.schema:
        schema_path = Path(args.schema)
        if not schema_path.exists():
            raise SystemExit(f"No existe el schema dump: {schema_path}")
        schema_sql = schema_path.read_text(encoding="utf-8", errors="ignore")
        columns = parse_table_columns_from_schema(schema_sql, args.table)
        if not columns:
            raise SystemExit(f"No encontré CREATE TABLE `{args.table}` dentro de {schema_path}")
    else:
        columns = list(df.columns)

    missing = [c for c in columns if c not in df.columns]
    if missing:
        raise SystemExit(f"Faltan columnas en el Excel (tras el mapeo): {missing}")

    # Validación estricta: Id debe existir y venir diligenciado
    if args.id_column in columns:
        # Fuerza a que la columna exista y no tenga valores vacíos/no numéricos
        # (la conversión real la hace generate_inserts con mensajes por fila)
        pass
    else:
        raise SystemExit(f"La columna ID '{args.id_column}' no está en el esquema/columnas. No puedo migrar IDs exactos.")

    # Generar SQL
    header = [
        "-- SQL generado desde Excel",
        f"-- Fecha: {_dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';",
        "START TRANSACTION;",
        "SET time_zone = '+00:00';",
        "/*!40101 SET NAMES utf8mb4 */;",
    ]
    if args.use_db:
        header.append(f"USE `{args.use_db}`;")
    header.append("")

    try:
        sql_body = generate_inserts(
            df, args.table, columns,
            batch_size=args.batch_size,
            id_column=args.id_column,
            on_duplicate=args.on_duplicate,
        )
    except ValueError as e:
        raise SystemExit(f"ERROR validando IDs:\n{e}")

    footer = ["", "COMMIT;", ""]

    out_path = Path(args.out)
    out_path.write_text("\n".join(header) + sql_body + "\n".join(footer), encoding="utf-8")
    print(f"OK -> {out_path} ({len(df)} filas)")


if __name__ == "__main__":
    main()