import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Contato from '../entities/Contato';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'contatos';

  constructor(private firestore : AngularFirestore) { }

  read(){
    return this.firestore.collection(this.PATH)
    .snapshotChanges();
  }

  create(contato: Contato){
    return this.firestore.collection(this.PATH)
    .add({nome: contato.nome, telefone: contato.telefone});
  }

  update(contato: Contato, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: contato.nome, telefone: contato.telefone});
  }

  delete(contato: Contato){
    return this.firestore.collection(this.PATH)
    .doc(contato.id)
    .delete()
  }
}
