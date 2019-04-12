import { DragDropService } from './../drag-drop.service';
import { Directive ,HostListener, Input,ElementRef, Renderer, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  private _isDraggble = false;

  public get isDraggble() {
    return this._isDraggble;
  }
  @Input('app-draggable')
  public set isDraggble(val: boolean) {
    this._isDraggble = val;
    this.rd.setAttribute(this.el.nativeElement , 'draggable', `${val}`)
  }

  @Input()draggedClass: string;
  @Input() dragTag:string;
  @Input() dragData:any;
  constructor(private el:ElementRef, private rd: Renderer2 , private dragdropservice: DragDropService ) { }

  @HostListener('dragstart',['$event'])
  ondragstart(ev: Event){
      if(this.el.nativeElement === ev.target){
        this.rd.addClass(this.el.nativeElement , this.draggedClass);
        this.dragdropservice.setDragData({tag:this.dragTag, data: this.dragData});
      }
  }

  @HostListener('dragend',['$event'])
   onDrageEnd(ev: Event){
    if(this.el.nativeElement === ev.target){
      this.rd.removeClass(this.el.nativeElement , this.draggedClass);
    }
  }
}
