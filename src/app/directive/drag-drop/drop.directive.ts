import { DragDropService, DragData } from './../drag-drop.service';
import { Directive ,HostListener,EventEmitter,Output,ElementRef,Renderer2,Input} from '@angular/core';


@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})

export class DropDirective {



  @Input() dragEnterClass:string;

  @Input() dropTags:string[] =[];

  @Output() dropped = new EventEmitter<DragData>();

  private data$;

  constructor(private el:ElementRef, private rd:Renderer2, private service: DragDropService) {
    this.data$ = this.service.getDragData().take(1);
  }

  @HostListener('dragenter',['$event'])
  ondragEnter(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(
        dragData => {
          if(this.dropTags.indexOf(dragData.tag) > -1){
            this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
          }
        }
      )

    }
  }
  @HostListener('dragover',['$event'])
  ondragOver(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();

    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(
        dragData => {
          if(this.dropTags.indexOf(dragData.tag)>-1){
            this.rd.setProperty(ev,'dataTransfer.effectAllowed','all');
            this.rd.setProperty(ev,'dataTransfer.dropEffect','move');
          }else {
            this.rd.setProperty(ev,'dataTransfer.effectAllowed','none');
            this.rd.setProperty(ev,'dataTransfer.dropEffect','none');
          }
        }
      );
    }
  }

  @HostListener('dragleave',['$event'])
  ondragLeave(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(
        dragData => {
          if(this.dropTags.indexOf(dragData.tag)> -1){
            this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          }
        }
      );
    }
  }
  @HostListener('drop',['$event'])
  onDrop(ev:Event){
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target){
      this.data$.subscribe(
        dragData => {
          if(this.dropTags.indexOf(dragData.tag)> -1){
            this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
            this.dropped.emit(dragData);
            this.service.clearDragData();
          }
        }
      );

    }
  }
}
