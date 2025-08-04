import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(400)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      categoryId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.loadProduct();
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.error = 'Error al cargar las categorías';
        console.error('Error:', error);
      }
    });
  }

  loadProduct(): void {
    if (this.productId) {
      this.loading = true;
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar el producto';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;

      const productData: Product = {
        ...this.productForm.value,
        price: parseFloat(this.productForm.value.price),
        categoryId: parseInt(this.productForm.value.categoryId)
      };

      const operation = this.isEditMode 
        ? this.productService.updateProduct(this.productId!, productData)
        : this.productService.createProduct(productData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar el producto' 
            : 'Error al crear el producto';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        const fieldNames: {[key: string]: string} = {
          'name': 'El nombre',
          'description': 'La descripción',
          'price': 'El precio',
          'categoryId': 'La categoría'
        };
        return `${fieldNames[fieldName]} es requerido`;
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `Mínimo ${minLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `Máximo ${maxLength} caracteres`;
      }
      if (control.errors['min']) {
        const min = control.errors['min'].min;
        return `El valor mínimo es ${min}`;
      }
      if (control.errors['pattern']) {
        return 'Debe ser un número entero';
      }
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
