# Sistema de Gestión de Productos y Categorías

Sistema completo con **Angular 19** (Frontend), **Spring Boot** (Backend) y **MySQL** (Base de datos), todo containerizado con **Docker**.

## 🚀 Ejecutar en 30 segundos

### ⚡ Un solo comando (sin código fuente):

```bash
curl -O https://raw.githubusercontent.com/gamurigm/product-category-apis-front-end/main/docker-compose.hub.yml && docker-compose -f docker-compose.hub.yml up
```

### 📱 Acceder a la aplicación:
- **Frontend**: http://localhost:4200
- **API Categorías**: http://localhost:8089/api/categorias  
- **API Productos**: http://localhost:8088/api/products



```

## 🔧 Para Desarrolladores
```bash
git clone https://github.com/gamurigm/product-category-apis-front-end.git
cd product-category-apis-front-end

 docker compose -f docker-compose.hub.yml down
```

## 🐳 Imágenes Docker Hub
- `ryuzakizeitan/frontend-products-cats:latest`
- `ryuzakizeitan/categorias:latest`
- `ryuzakizeitan/productos:latest`

---
**¡Aplicación lista en 2-3 minutos!** 🚀