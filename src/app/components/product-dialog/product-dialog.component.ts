import { Component, Inject, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../interfaces/product';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent {
  form:FormGroup;
  isEditMode:boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product
  ){
    this.isEditMode=!!data.id;
    this.form=this.fb.group({
      id:[data.id],
      name:[data.name || '',[Validators.required]],
      description:[data.description || '',[Validators.required]],
      price:[data.price || '',[Validators.required,Validators.min(0)]],
      stockQuantity:[data.stockQuantity || '',[Validators.required,Validators.min(0)]],
      category:[data.category || '',[Validators.required,]],
    })
  }

  onSubmit():void{
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
  onCancel():void{
    this.dialogRef.close();
  }

}
