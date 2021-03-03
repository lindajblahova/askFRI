import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteProfileComponent} from '../../components/dialog/dialog-delete-profile/dialog-delete-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _userId;
  private _userData;
  private _isHidden = true;
  private _firstFormGroup = this.formBuilder.group({
    oldPassword: ['', Validators.required]
  });
  private _secondFormGroup  = this.formBuilder.group({
    newPassword: ['', Validators.required]
  });
  private _thirdFormGroup = this.formBuilder.group({
    newPasswordConfirm: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('userId'));
      console.log(this.userId);
    });

    this.userService.getUserById(this.userId).subscribe(data => this.userData = data);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /// GETTERS AND SETTERS
  get thirdFormGroup(): FormGroup {
    return this._thirdFormGroup;
  }

  set thirdFormGroup(value: FormGroup) {
    this._thirdFormGroup = value;
  }
  get secondFormGroup(): FormGroup {
    return this._secondFormGroup;
  }

  set secondFormGroup(value: FormGroup) {
    this._secondFormGroup = value;
  }
  get firstFormGroup(): FormGroup {
    return this._firstFormGroup;
  }

  set firstFormGroup(value: FormGroup) {
    this._firstFormGroup = value;
  }
  get isHidden(): boolean {
    return this._isHidden;
  }

  set isHidden(value: boolean) {
    this._isHidden = value;
  }
  get userData() {
    return this._userData;
  }

  set userData(value) {
    this._userData = value;
  }
  get userId() {
    return this._userId;
  }

  set userId(value) {
    this._userId = value;
  }

}