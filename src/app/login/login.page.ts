import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model: User;

  constructor(
    public navCtrl: NavController,   
    private toast: ToastController,
    private usersService: UsersService) {

      this.model = new User();
      this.model.email = "eve.holt@reqres.in";
      this.model.password = "pistol"; 
    }

  ngOnInit() {
  }

  login() {
    this.usersService.login(this.model.email, this.model.password)
    .then((result: any) => {

      this.toast.create({ message: "Usuário logado com sucesso. token:" + result.token,
                          position: "bottom", duration: 3000})
                          .then( toast => { toast.present() });
    })
    .catch((error) => {

      this.toast.create({message: "Erro ao efetuar login. Erro: " + error.error,
                        position: "bottom", duration: 3000})
                        .then( toast => { toast.present() });
    })
  }

}

export class User {
  email: string;
  password: string;
}
