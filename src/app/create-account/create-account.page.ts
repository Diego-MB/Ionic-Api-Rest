import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

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

  createAccount() {
    this.usersService.createAccount(this.model.email, this.model.password)
    .then((result: any) => {
      
      this.toast.create({message: "Usuário criado com sucesso. Token: " + result.token,
                        position: "bottom", duration: 3000})
                        .then( toast => { toast.present() });
    })
    .catch((error: any) => {
      
      this.toast.create({message: "Erro ao criar o usuário. Erro: " + error.error,
                        position: "bottom", duration: 3000})
                        .then( toast => { toast.present() });
    })
  }

}

export class User {
  email: string;
  password: string;
}
