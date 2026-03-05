#!/usr/bin/env python3
"""
excel_to_sql_empleados.py

Convierte un Excel (.xlsx) a un archivo .sql con sentencias INSERT (MySQL/MariaDB).

NUEVO: IDs automáticos sin colisión
- Si en tu Excel el Id viene vacío o '-', el script puede arrancar desde (MAX(Id)+1) de tu BD.

Ejemplos:

1) Automático consultando la BD (recomendado):
   # Linux/macOS (evita poner la clave en la línea de comando)
   export MYSQL_PWD='TU_CLAVE'
   python excel_to_sql_empleados.py --excel Empleados.xlsx --schema empleados_db.sql --out empleados_inserts.sql \
     --table empleados --db-name empleados_db --db-user root --db-host 127.0.0.1 --auto-max-id

   # Windows (PowerShell)
   $env:MYSQL_PWD="TU_CLAVE"
   python excel_to_sql_empleados.py --excel Empleados.xlsx --schema empleados_db.sql --out empleados_inserts.sql `
     --table empleados --db-name empleados_db --db-user root --db-host 127.0.0.1 --auto-max-id

2) Si ya sabes el máximo Id actual:
   python excel_to_sql_empleados.py --excel Empleados.xlsx --schema empleados_db.sql --out empleados_inserts.sql \
     --table empleados --existing-max-id 250

"""

from __future__ import annotations

import argparse
import datetime as _dt
import math
import re
import subprocess
from pathlib import Path

import pandas as pd


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


def get_max_id_via_mysql_cli(
    mysql_bin: str,
    host: str,
    port: int,
    user: str,
    db_name: str,
    table: str,
    id_column: str = "Id",
    password: str | None = None,
    password_env: str | None = None,
) -> int:
    """
    Consulta MAX(Id) usando el cliente 'mysql' (sin requerir librerías extra).
    Recomendación: usa MYSQL_PWD (env) en vez de pasar la clave por argumento.
    """
    query = f"SELECT COALESCE(MAX(`{id_column}`),0) FROM `{table}`;"
    cmd = [
        mysql_bin,
        "-N",  # no headers
        "-s",  # silent
        "-h", host,
        "-P", str(port),
        "-u", user,
        db_name,
        "-e", query,
    ]

    env = dict(**{k: v for k, v in (dict(**__import__("os").environ)).items()})
    if password_env:
        # el usuario puede exportar esta variable previamente
        if password_env in env:
            env["MYSQL_PWD"] = env[password_env]
        else:
            raise RuntimeError(f"No existe la variable de entorno {password_env}.")
    elif password:
        env["MYSQL_PWD"] = password

    p = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if p.returncode != 0:
        raise RuntimeError(
            "No pude consultar MAX(Id) con mysql.\n"
            f"STDERR:\n{p.stderr}\n"
            f"Comando: {' '.join(cmd)}\n"
            "Tip: asegúrate de que el cliente 'mysql' esté instalado y que --db-host/--db-user/--db-name sean correctos."
        )
    out = (p.stdout or "").strip()
    try:
        return int(out) if out else 0
    except Exception:
        raise RuntimeError(f"Respuesta inesperada al consultar MAX(Id): {out!r}")


def assign_ids(id_series: pd.Series, start_id: int) -> list[int]:
    """Asigna IDs consecutivos donde el Excel tenga vacío, '-' o no numérico."""
    ids: list[int] = []
    cur = int(start_id)
    for v in id_series.tolist():
        if v is None:
            ids.append(cur); cur += 1; continue
        s = str(v).strip()
        if s == "" or s == "-" or s.lower() == "nan":
            ids.append(cur); cur += 1; continue
        try:
            ids.append(int(float(s)))
        except Exception:
            ids.append(cur); cur += 1
    return ids


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


def generate_inserts(df: pd.DataFrame, table: str, columns: list[str], batch_size: int = 500, id_column: str = "Id") -> str:
    col_sql = ", ".join(f"`{c}`" for c in columns)
    out_lines: list[str] = []
    for start in range(0, len(df), batch_size):
        chunk = df.iloc[start:start + batch_size]
        rows = []
        for _, row in chunk.iterrows():
            vals = []
            for c in columns:
                if c == id_column:
                    vals.append(str(int(row[c])))
                else:
                    vals.append(sql_literal_mysql(row[c]))
            rows.append("(" + ", ".join(vals) + ")")
        out_lines.append(f"INSERT INTO `{table}` ({col_sql}) VALUES\n" + ",\n".join(rows) + ";\n")
    return "\n".join(out_lines)


def main():
    ap = argparse.ArgumentParser(description="Convierte Excel a .sql con INSERTs (MySQL/MariaDB).")
    ap.add_argument("--excel", required=True, help="Ruta del archivo Excel .xlsx")
    ap.add_argument("--out", required=True, help="Ruta del archivo .sql de salida")
    ap.add_argument("--schema", default="", help="(Opcional) Dump .sql para leer columnas/orden de la tabla")
    ap.add_argument("--table", default="empleados", help="Nombre de la tabla destino")
    ap.add_argument("--sheet", default=0, help="Hoja del Excel (nombre o índice). Default: 0 (primera)")
    ap.add_argument("--batch-size", type=int, default=500, help="Filas por INSERT multi-row")
    ap.add_argument("--id-column", default="Id", help="Nombre de la columna ID en la tabla (default: Id)")

    # IDs: modo manual o automático
    ap.add_argument("--start-id", type=int, default=1, help="Id inicial si el Excel trae '-' o vacío (manual)")
    ap.add_argument("--existing-max-id", type=int, default=None, help="Si ya sabes el MAX(Id) en tu sistema, ponlo aquí")
    ap.add_argument("--auto-max-id", action="store_true", help="Consulta MAX(Id) en la BD y arranca desde MAX+1")

    # Conexión para auto-max-id (via mysql CLI)
    ap.add_argument("--mysql-bin", default="mysql", help="Ruta/comando del cliente mysql (default: mysql)")
    ap.add_argument("--db-host", default="127.0.0.1", help="Host MySQL (default: 127.0.0.1)")
    ap.add_argument("--db-port", type=int, default=3306, help="Puerto MySQL (default: 3306)")
    ap.add_argument("--db-user", default="", help="Usuario MySQL (requerido si usas --auto-max-id)")
    ap.add_argument("--db-name", default="", help="Nombre BD (requerido si usas --auto-max-id)")
    ap.add_argument("--db-password", default="", help="(Opcional) Clave MySQL (recomendado usar MYSQL_PWD env)")
    ap.add_argument("--db-password-env", default="", help="(Opcional) Nombre de variable env que contiene la clave (p.ej. MYSQL_PWD)")

    # Para incluir "USE `db`;" en el SQL final (opcional)
    ap.add_argument("--use-db", default="", help="(Opcional) Inserta 'USE `db`;' en el archivo de salida")

    args = ap.parse_args()

    excel_path = Path(args.excel)
    if not excel_path.exists():
        raise SystemExit(f"No existe el Excel: {excel_path}")

    # Leer todo como texto para no perder ceros a la izquierda
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

    # Determinar start_id real
    start_id_effective = args.start_id
    if args.auto_max_id:
        if not args.db_user or not args.db_name:
            raise SystemExit("Con --auto-max-id debes indicar --db-user y --db-name.")
        max_id = get_max_id_via_mysql_cli(
            mysql_bin=args.mysql_bin,
            host=args.db_host,
            port=args.db_port,
            user=args.db_user,
            db_name=args.db_name,
            table=args.table,
            id_column=args.id_column,
            password=(args.db_password or None),
            password_env=(args.db_password_env or None),
        )
        start_id_effective = int(max_id) + 1
        print(f"[INFO] MAX({args.id_column}) en `{args.table}` = {max_id}. Asignando nuevos IDs desde {start_id_effective}.")
    elif args.existing_max_id is not None:
        start_id_effective = int(args.existing_max_id) + 1
        print(f"[INFO] existing-max-id={args.existing_max_id}. Asignando nuevos IDs desde {start_id_effective}.")

    # Asignar IDs solo donde el Excel trae '-' o vacío
    if args.id_column in columns:
        df[args.id_column] = assign_ids(df[args.id_column], start_id_effective)

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

    sql_body = generate_inserts(df, args.table, columns, batch_size=args.batch_size, id_column=args.id_column)
    footer = ["", "COMMIT;", ""]

    out_path = Path(args.out)
    out_path.write_text("\n".join(header) + sql_body + "\n".join(footer), encoding="utf-8")
    print(f"OK -> {out_path} ({len(df)} filas)")


if __name__ == "__main__":
    main()
