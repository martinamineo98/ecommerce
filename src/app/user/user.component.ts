import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  currentBlock: string = ''

  user = {
    first_name: 'john',
    last_name: 'doe',
    email: 'johndoe@gmail.com',
    birthdate: '01/01/2001',
    street: 'via mario bianchi 21',
    city: 'roma',
    provence: 'ro',
    zip_code: '10100',
    country: 'italy'
  }

  userElements: any[] = []

  navItems: any[] = []
  userBlocks: any[] = []

  nav: any[] = [
    {
      str: 'account information'
    },
    {
      str: 'orders'
    },
    {
      str: 'settings'
    }
  ]

  userForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    birthdate: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    provence: new FormControl(''),
    zip_code: new FormControl(''),
    country: new FormControl('')
  })

  ngOnInit() {
    this.currentBlock = this.nav[0].str
    this.populateUserElements()
  }

  ngAfterViewInit() {
    this.navItems = Array.from(document.querySelectorAll('.user-nav a'))
    this.userBlocks = Array.from(document.querySelectorAll('.user-block'))

    this.navItems[0].classList.add('current')
    this.userBlocks[0].classList.add('show')
  }

  changeContent(i: number) {
    this.navItems.map((item) => item.classList.remove('current'))
    this.navItems[i].classList.add('current')

    this.userBlocks.map((item) => item.classList.remove('show'))
    this.userBlocks[i].classList.add('show')

    this.currentBlock = this.nav[i].str
  }

  populateUserElements() {
    this.getUserInfo()

    for (let [index, [k, v]] of Object.entries(Object.entries(this.user))) {
      if ( this.userElements.length < Object.entries(this.user).length ) {
        this.userElements.push([k.replace('_', ' '), v])
      } else {
        this.userElements[parseFloat(index)][1] = v
      }
    }
  }

  getUserInfo() {      
    for (let [index, [k, v]] of Object.entries(Object.entries(this.user))) {
      let str = localStorage.hasOwnProperty(k) ? localStorage.getItem(k) : v
      this.user[k as keyof typeof this.user] = str || this.user[k as keyof typeof this.user]
    }
  }

  clickEditBtn() {
    this.changeContent(2)
  }

  clickSaveBtn() {
    let inputs = Array.from(document.querySelectorAll('.user-settings input'))

    for (let [index, [k, v]] of Object.entries(Object.entries(this.userForm.value))) {
      let placeholder = inputs[parseFloat(index)].getAttribute('placeholder')
      let str = v === '' ? placeholder : v

      localStorage.setItem(k, str || '')
    }

    this.populateUserElements()
    this.changeContent(0)
  }

}
