import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  constructor(private toaster: ToastrService, private api: AdminService, private router: Router) {

  }

  login() {
    // admin logic login
    if (this.email && this.password) {
      // alert("proceed to api call")
      // this.toaster.success("proceed to api call")
      this.api.getAdminDetails().subscribe({
        next: (res: any) => {
          console.log(res);
          const { email, password } = res
          if (email == this.email && password == this.password) {
            this.toaster.success("Login Successful")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            this.email=""
            this.password=""
            // navigate
            this.router.navigateByUrl("/dashboard")

          } else {
            this.toaster.error("Invalid Email/Password")
          }
        },
        error: (reason: any) => {
          this.toaster.error(reason.message);

        }
      })
    } else {
      // alert("please fill the form completely!!")
      this.toaster.info("Please fill the form completely!!")
    }

  }
}
