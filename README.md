# Sistema de Gestión de Productos y Categorías

Sistema completo de gestión de productos y categorías desarrollado con **Angular 19** (Frontend), **Spring Boot con Java 17** (Backend) y **MySQL** (Base de datos), todo containerizado con **Docker Compose**.

## 🚀 Características

### Funcionalidades
- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar categorías y productos
- ✅ **Validaciones**: Validación tanto en Frontend (Angular) como Backend (Spring Boot)
- ✅ **Diseño Responsivo**: Interfaz adaptable a diferentes tamaños de pantalla
- ✅ **Filtros y Búsqueda**: Filtrado de productos por categoría y búsqueda por texto
- ✅ **Gestión de Errores**: Manejo robusto de errores con mensajes informativos

### Tecnologías
- **Frontend**: Angular 19, TypeScript, SCSS, Angular Material
- **Backend**: Spring Boot 3.2, Java 17, JPA/Hibernate
- **Base de Datos**: MySQL 8.0
- **Containerización**: Docker, Docker Compose
- **Servidor Web**: Nginx (para servir el frontend en producción)

## 📋 Prerequisitos

- Docker Desktop instalado
- Docker Compose
- Git

## 🔧 Instalación y Ejecución

### Opción 1: Ejecución Completa con Docker Compose (Recomendado)

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd product-categories-app
   ```

2. **Verificar que las APIs estén disponibles**:
   - API de Categorías en: `C:\Users\gamur\Downloads\categorias`
   - API de Productos en: `C:\Users\gamur\Downloads\products`

3. **Levantar todo el sistema con un solo comando**:
   ```bash
   docker-compose up --build
   ```

4. **Acceder a la aplicación**:
   - **Frontend**: http://localhost:4200
   - **API Categorías**: http://localhost:8089/api/categorias
   - **API Productos**: http://localhost:8088/api/products
   - **Base de Datos MySQL**: localhost:3306

### Opción 2: Desarrollo Local

1. **Instalar dependencias del frontend**:
   ```bash
   npm install
   ```

2. **Levantar las APIs por separado**:
   ```bash
   # Terminal 1 - API de Categorías
   cd C:\Users\gamur\Downloads\categorias
   docker-compose up

   # Terminal 2 - API de Productos  
   cd C:\Users\gamur\Downloads\products\products
   docker-compose up
   ```

3. **Ejecutar el frontend**:
   ```bash
   # En el directorio del proyecto
   ng serve
   ```

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend APIs  │    │   Database      │
│   Angular 19    │◄──►│   Spring Boot   │◄──►│   MySQL 8.0     │
│   Port: 4200    │    │   Ports:        │    │   Port: 3306    │
└─────────────────┘    │   8089, 8088    │    └─────────────────┘
                       └─────────────────┘
```

### Endpoints de las APIs

#### API de Categorías (Puerto 8089)
- `GET /api/categorias` - Listar todas las categorías
- `GET /api/categorias/{id}` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

#### API de Productos (Puerto 8088)
- `GET /api/products` - Listar todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

## 🗃️ Estructura del Proyecto

```
product-categories-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── category-form/
│   │   │   ├── category-list/
│   │   │   ├── product-form/
│   │   │   └── product-list/
│   │   ├── models/
│   │   │   ├── category.model.ts
│   │   │   └── product.model.ts
│   │   ├── services/
│   │   │   ├── category.service.ts
│   │   │   └── product.service.ts
│   │   └── ...
│   └── ...
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── README.md
```

## 🎨 Modelos de Datos

### Categoría
```typescript
interface Category {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaCreacion?: Date;
}
```

### Producto
```typescript
interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
}
```

## 🔍 Validaciones

### Frontend (Angular)
- **Categorías**:
  - Nombre: Requerido, 3-50 caracteres
  - Descripción: Máximo 255 caracteres
- **Productos**:
  - Nombre: Requerido, 2-100 caracteres
  - Descripción: Máximo 400 caracteres
  - Precio: Requerido, mínimo 0.01
  - Categoría: Requerida

### Backend (Spring Boot)
- Validaciones con anotaciones JPA
- Validaciones de negocio en servicios
- Manejo de errores con ResponseEntity

## 🚦 Estados de la Aplicación

- ✅ **Frontend Angular**: Completo con validaciones y diseño responsivo
- ✅ **APIs Backend**: Integradas con APIs existentes en puertos 8089 y 8088
- ✅ **Base de Datos**: MySQL configurada y compartida
- ✅ **Docker**: Configuración completa con docker-compose
- ✅ **Documentación**: README con instrucciones claras

## 🛠️ Comandos Útiles

```bash
# Construir y ejecutar todo
docker-compose up --build

# Ejecutar en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar todos los servicios
docker-compose down

# Limpiar volúmenes (eliminar datos de BD)
docker-compose down -v

# Reconstruir solo el frontend
docker-compose build frontend

# Desarrollo local del frontend
ng serve --open
```

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests e2e
npm run e2e

# Build de producción
npm run build
```

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles**: < 768px
- 📱 **Tablets**: 768px - 1024px  
- 💻 **Desktop**: > 1024px

## 🔐 Seguridad

- Configuración CORS habilitada
- Headers de seguridad en Nginx
- Validaciones tanto en frontend como backend
- Escape de datos para prevenir XSS

## 🐛 Solución de Problemas

### Error de conexión a APIs
1. Verificar que las APIs estén ejecutándose en los puertos correctos
2. Comprobar la configuración de red de Docker
3. Revisar logs: `docker-compose logs`

### Error de base de datos
1. Verificar que MySQL esté funcionando: `docker-compose ps`
2. Comprobar la configuración de conexión
3. Reiniciar los servicios: `docker-compose restart`

## 👥 Contribuir

1. Fork del proyecto
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte y preguntas, crear un issue en el repositorio de GitHub.

---

**¡Sistema completamente funcional con un solo comando! 🚀**

```bash
docker-compose up --build
```
