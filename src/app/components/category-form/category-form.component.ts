import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.loadCategory();
    }
  }

  loadCategory(): void {
    if (this.categoryId) {
      this.loading = true;
      this.categoryService.getCategoryById(this.categoryId).subscribe({
        next: (category) => {
          this.categoryForm.patchValue({
            nombre: category.nombre,
            descripcion: category.descripcion
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar la categoría';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading = true;
      this.error = null;

      const categoryData: Category = this.categoryForm.value;

      const operation = this.isEditMode 
        ? this.categoryService.updateCategory(this.categoryId!, categoryData)
        : this.categoryService.createCategory(categoryData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          this.error = this.isEditMode 
            ? 'Error al actualizar la categoría' 
            : 'Error al crear la categoría';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.categoryForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName === 'nombre' ? 'El nombre' : 'La descripción'} es requerida`;
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `Mínimo ${minLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `Máximo ${maxLength} caracteres`;
      }
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
