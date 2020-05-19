// import { TestBed, inject } from '@angular/core/testing';
// import { AdministrativeService } from './administrative.service';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Rx';
// import { Administrative } from '../model/administrative';

// const input: Administrative[][] = [[
//   { name: 'Polska', uname: 'polska', parent: ''},
//   { name: 'Dolnośląskie', uname: 'dolnoslaskie', parent: 'polska'},
//   { name: 'Wrocław', uname: 'wroclaw', parent: 'dolnoslaskie'}
// ]];

// const data = Observable.from(input);

// const collectionStub = {
//   valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
// }

// const angularFiresotreStub = {
//   collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
// }

// describe('AdministrativeService', () => {
//   let service: AdministrativeService;
//   let angularFirestore: AngularFirestore;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         AdministrativeService,
//         { provide: AngularFirestore, useValue: angularFiresotreStub }
//       ]
//     });

//     service = TestBed.get(AdministrativeService);
//     angularFirestore = TestBed.get(AngularFirestore);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//     expect(angularFiresotreStub.collection).toHaveBeenCalledWith('administrative');
//   });

//   it('gets hierarchy path', () => {
//     const result = service.getPath('wroclaw');
//     expect(result).toEqual(['Polska', 'Dolnośląskie', 'Wrocław']);
//   });

// });
// sharefollow
// edited Sep 30 '19 at 13:13
// answered Dec 21 '17 at 14:21

// Walter Luszczyk
