import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepotNewComponent } from './entrepot-new.component';

describe('EntrepotNewComponent', () => {
  let component: EntrepotNewComponent;
  let fixture: ComponentFixture<EntrepotNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepotNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepotNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
