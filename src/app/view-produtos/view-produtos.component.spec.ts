import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProdutosComponent } from './view-produtos.component';

describe('ViewProdutosComponent', () => {
  let component: ViewProdutosComponent;
  let fixture: ComponentFixture<ViewProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
