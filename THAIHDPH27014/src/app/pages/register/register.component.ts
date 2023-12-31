import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) {

  }

  authForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
   
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    avt: ['', [Validators.required, Validators.required]],
  }, {
    validator: this.passwordMatchValidator,
  })

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    const data = this.authForm.value;
    this.authService.signUp(data).subscribe(() => {
      alert("Dang ki tai khoan thanh cong!")
      this.route.navigateByUrl('/login')
    })
    
    
  }

}




 