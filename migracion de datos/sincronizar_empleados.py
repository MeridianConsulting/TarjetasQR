import re
import shutil
from datetime import datetime

# Archivos
ARCHIVO_ACTUALIZADO = 'empleados_actualizados.sql'
ARCHIVO_DESTINO = 'empleados_db.sql'

# Valores fijos para empleados_db
COMPANIA = 'MERIDIAN CONSULTING LTDA'
TELEFONO_EMPRESA = '3138174050'
TELEFONO_INTERNACIONAL = '(1) 713 623 1113'

def extraer_empleados_actualizados():
    """Extrae empleados de empleados_actualizados.sql"""
    print("="*80)
    print("SINCRONIZAR EMPLEADOS - ACTUALIZACION DE BASE DE DATOS")
    print("="*80)
    
    print(f"\n[1/5] Leyendo empleados de {ARCHIVO_ACTUALIZADO}...")
    
    empleados = {}
    
    with open(ARCHIVO_ACTUALIZADO, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Patrón para extraer datos de empleados_actualizados.sql
    # Formato: (id_empleado, cedula, nombre, tipo_documento, cargo, area, fecha, email, ...)
    patron = re.compile(
        r"\((\d+),\s*(\d+),\s*'([^']+)',\s*'[^']*',\s*'([^']*)',\s*'[^']*',\s*'[^']*',\s*'?([^',]*)'?",
        re.IGNORECASE
    )
    
    matches = patron.findall(contenido)
    
    for match in matches:
        id_empleado, cedula, nombre, cargo, email = match
        cedula = int(cedula)
        nombre = nombre.strip()
        cargo = cargo.strip()
        email = email.strip() if email else None
        
        empleados[cedula] = {
            'nombre': nombre,
            'cargo': cargo,
            'email': email
        }
    
    print(f"      OK: {len(empleados)} empleados encontrados en base actualizada")
    return empleados

def extraer_empleados_db():
    """Extrae empleados de empleados_db.sql incluyendo números de teléfono"""
    print(f"\n[2/5] Leyendo empleados de {ARCHIVO_DESTINO}...")
    
    empleados = {}
    
    with open(ARCHIVO_DESTINO, 'r', encoding='utf-8') as f:
        lineas = f.readlines()
    
    for linea in lineas:
        if linea.strip().startswith('(') and 'MERIDIAN CONSULTING' in linea:
            # Extraer: (Id, 'nombre', 'cargo', 'telefono', 'email', ...)
            match = re.match(
                r"\((\d+),\s*'([^']*)',\s*'([^']*)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)",
                linea
            )
            if match:
                cedula = int(match.group(1))
                nombre = match.group(2).strip()
                cargo = match.group(3).strip()
                telefono = match.group(4).strip() if match.group(4) else None
                email = match.group(5).strip() if match.group(5) else None
                
                empleados[cedula] = {
                    'nombre': nombre,
                    'cargo': cargo,
                    'telefono': telefono,
                    'email': email
                }
    
    print(f"      OK: {len(empleados)} empleados encontrados en base actual")
    return empleados

def comparar_bases(empleados_actualizados, empleados_db):
    """Compara las dos bases y encuentra empleados a eliminar"""
    print(f"\n[3/5] Comparando bases de datos...")
    
    cedulas_actualizadas = set(empleados_actualizados.keys())
    cedulas_db = set(empleados_db.keys())
    
    # Empleados que están en DB pero no en actualizados = a eliminar
    a_eliminar = cedulas_db - cedulas_actualizadas
    
    # Empleados que están en ambos = actualizar
    a_actualizar = cedulas_actualizadas.intersection(cedulas_db)
    
    # Empleados nuevos en actualizados que no están en DB
    nuevos = cedulas_actualizadas - cedulas_db
    
    print(f"      - Empleados a actualizar: {len(a_actualizar)}")
    print(f"      - Empleados nuevos: {len(nuevos)}")
    print(f"      - Empleados a eliminar: {len(a_eliminar)}")
    
    return a_actualizar, nuevos, a_eliminar

def actualizar_empleados_db(empleados_actualizados, empleados_db, a_actualizar, nuevos, a_eliminar):
    """Actualiza empleados_db.sql con los datos actualizados"""
    print(f"\n[4/5] Generando base de datos actualizada...")
    
    # Crear backup
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f'empleados_db.sql.backup_{timestamp}'
    shutil.copy2(ARCHIVO_DESTINO, backup_file)
    print(f"      Backup creado: {backup_file}")
    
    # Leer estructura del archivo
    with open(ARCHIVO_DESTINO, 'r', encoding='utf-8') as f:
        lineas = f.readlines()
    
    # Encontrar líneas de estructura
    linea_insert = -1
    for i, linea in enumerate(lineas):
        if 'INSERT INTO `empleados`' in linea and 'VALUES' in linea:
            linea_insert = i
            break
    
    linea_indices = -1
    for i, linea in enumerate(lineas):
        if '-- Índices para tablas volcadas' in linea:
            linea_indices = i
            break
    
    # Estructura antes de los datos
    estructura_inicio = lineas[:linea_insert]
    
    # Estructura después de los datos
    estructura_fin = lineas[linea_indices:]
    
    # Generar nuevas líneas de datos
    print(f"      Generando registros...")
    
    # Combinar empleados actualizados con los teléfonos que tenemos en DB
    todos_empleados = []
    
    for cedula in sorted(empleados_actualizados.keys()):
        emp_act = empleados_actualizados[cedula]
        telefono = None
        
        # Si el empleado existe en DB, conservar su teléfono
        if cedula in empleados_db:
            telefono = empleados_db[cedula]['telefono']
        
        todos_empleados.append({
            'cedula': cedula,
            'nombre': emp_act['nombre'],
            'cargo': emp_act['cargo'],
            'telefono': telefono,
            'email': emp_act['email']
        })
    
    # Escribir archivo nuevo
    with open(ARCHIVO_DESTINO, 'w', encoding='utf-8') as f:
        # Escribir estructura inicial
        f.writelines(estructura_inicio)
        
        # Escribir línea inicial del INSERT
        f.write("INSERT INTO `empleados` (`Id`, `nombre`, `cargo`, `numero_telefonico`, `email`, `compania`, `telefono_empresa`, `telefono_internacional`, `imageUrl`) VALUES\n")
        
        # Escribir cada empleado
        for i, emp in enumerate(todos_empleados):
            nombre = emp['nombre'].replace("'", "''")
            cargo = emp['cargo'].replace("'", "''")
            telefono = f"'{emp['telefono']}'" if emp['telefono'] else 'NULL'
            email = f"'{emp['email'].replace(chr(39), chr(39)+chr(39))}'" if emp['email'] else 'NULL'
            
            linea = f"({emp['cedula']}, '{nombre}', '{cargo}', {telefono}, {email}, '{COMPANIA}', '{TELEFONO_EMPRESA}', '{TELEFONO_INTERNACIONAL}', NULL)"
            
            if i < len(todos_empleados) - 1:
                linea += ","
            else:
                linea += ";"
            
            f.write(linea + "\n")
        
        f.write("\n")
        
        # Escribir estructura final
        f.writelines(estructura_fin)
    
    print(f"      OK: Archivo {ARCHIVO_DESTINO} actualizado")
    
    return backup_file

def mostrar_reporte(empleados_db, a_eliminar):
    """Muestra el reporte de empleados eliminados"""
    if not a_eliminar:
        print("\n      No hay empleados para eliminar")
        return
    
    print(f"\n{'='*80}")
    print("EMPLEADOS ELIMINADOS DE LA BASE DE DATOS")
    print(f"{'='*80}")
    print(f"\nLos siguientes {len(a_eliminar)} empleados fueron ELIMINADOS porque NO están")
    print(f"en la base de datos actualizada (empleados_actualizados.sql):\n")
    
    for i, cedula in enumerate(sorted(a_eliminar), 1):
        emp = empleados_db.get(cedula, {})
        nombre = emp.get('nombre', 'Desconocido')
        cargo = emp.get('cargo', 'N/A')
        print(f"{i:3d}. Cédula: {cedula:10d} | {nombre:50s} | {cargo}")
    
    print(f"\n{'='*80}")

def main():
    try:
        # 1. Extraer empleados de ambas bases
        empleados_actualizados = extraer_empleados_actualizados()
        empleados_db = extraer_empleados_db()
        
        # 2. Comparar bases
        a_actualizar, nuevos, a_eliminar = comparar_bases(empleados_actualizados, empleados_db)
        
        # 3. Actualizar archivo
        backup_file = actualizar_empleados_db(empleados_actualizados, empleados_db, a_actualizar, nuevos, a_eliminar)
        
        # 4. Mostrar reporte de eliminados
        print(f"\n[5/5] Generando reporte...")
        mostrar_reporte(empleados_db, a_eliminar)
        
        # 5. Resumen final
        print(f"\n{'='*80}")
        print("PROCESO COMPLETADO EXITOSAMENTE")
        print(f"{'='*80}")
        print(f"\nRESUMEN:")
        print(f"  - Base origen: {ARCHIVO_ACTUALIZADO}")
        print(f"  - Base destino: {ARCHIVO_DESTINO}")
        print(f"  - Backup creado: {backup_file}")
        print(f"  - Total empleados en base actualizada: {len(empleados_actualizados)}")
        print(f"  - Empleados actualizados: {len(a_actualizar)}")
        print(f"  - Empleados nuevos agregados: {len(nuevos)}")
        print(f"  - Empleados eliminados: {len(a_eliminar)}")
        print(f"\nEl archivo {ARCHIVO_DESTINO} ha sido actualizado con:")
        print(f"  ✓ Información actualizada de todos los empleados activos")
        print(f"  ✓ Números telefónicos conservados donde estaban disponibles")
        print(f"  ✓ Empleados obsoletos eliminados")
        print(f"\n{'='*80}")
        
    except Exception as e:
        print(f"\n✗ Error inesperado: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

