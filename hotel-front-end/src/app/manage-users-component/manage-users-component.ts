import { Component, signal } from '@angular/core';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';
import { User } from '../models/user/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-users-component.html',
  styleUrl: './manage-users-component.css',
})
export class ManageUsersComponent {
  editUserForm: FormGroup;

  roleOptions: string[] = ['guest', 'admin', 'manager'];
  selectedUser = signal<User>(new User(0, '', '', '', '', '', '', 0, false));

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.editUserForm = this.fb.group({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      middleNameControl: new FormControl(''),
      roleControl: new FormControl('', [Validators.required]),
      homeAddressControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      phoneNumberControl: new FormControl(0, [
        Validators.required,
        // Enforces that it must be a 10 digit number.
        Validators.pattern('^[0-9]{10}$'),
      ]),
      emailControl: new FormControl('', [Validators.required]),
      onboardingControl: new FormControl(false),
    });
    this.getAllUsers();
  }

  users = signal<User[]>([]);

  getAllUsers() {
    this.httpService.getAllUsers().subscribe((data) => {
      if (data) {
        this.users.set(data);
        console.log(this.users);
      }
    });
  }

  openEditModal(user: User) {
    this.selectedUser.set(user);
    console.log(user);
    this.editUserForm.patchValue({
      firstNameControl: user.firstName,
      middleNameControl: user.middleName,
      lastNameControl: user.lastName,
      homeAddressControl: user.address,
      phoneNumberControl: user.phoneNumber,
      roleControl: user.role,
      emailControl: user.email,
    });
    this.showEditModal = true;
  }

  // Get methods for all the form fields.

  get firstNameControl() {
    return this.editUserForm.get('firstNameControl');
  }

  get lastNameControl() {
    return this.editUserForm.get('lastNameControl');
  }

  get middleNameControl() {
    return this.editUserForm.get('middleNameControl');
  }

  get homeAddressControl() {
    return this.editUserForm.get('homeAddressControl');
  }

  get phoneNumberControl() {
    return this.editUserForm.get('phoneNumberControl');
  }

  get onboardingControl() {
    return this.editUserForm.get('onboardingControl');
  }

  get roleControl() {
    return this.editUserForm.get('roleControl');
  }

  get emailControl() {
    return this.editUserForm.get('emailControl');
  }

  // Methods used to open/close the edit user modal.
  showEditModal = false;

  dispalyEditModal() {
    this.showEditModal = false;
  }

  cancelEditModal() {
    this.showEditModal = false;
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.editUserFormSubmit();
  }

  cancelSubmit() {
    this.showConfirmation = false;
  }

  // Methods used to open/close the success modal

  showSuccessMessage = false;

  openSuccessModal() {
    this.showSuccessMessage = true;
  }

  closeSuccessModal() {
    this.showSuccessMessage = false;
    this.showEditModal = false;
  }

  editUserFormSubmit(): void {
    if (this.selectedUser() && this.selectedUser().id != null) {
      const updatedUser = new User(
        this.selectedUser().id,
        this.selectedUser().role,
        this.selectedUser().email,
        this.firstNameControl?.value,
        this.middleNameControl?.value,
        this.lastNameControl?.value,
        this.homeAddressControl?.value,
        this.phoneNumberControl?.value,
        this.selectedUser().onboardingComplete
      );
      this.httpService.updateProfile(updatedUser).subscribe({
        next: () => {
          this.openSuccessModal();
          this.getAllUsers();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
