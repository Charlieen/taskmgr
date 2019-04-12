
import { Component, OnInit, Input, Output ,EventEmitter,HostBinding ,HostListener, ChangeDetectionStrategy} from '@angular/core';
import {itemAnim} from '../../anims/item.anim';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations:[
    itemAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;

  @Output() taskEdit = new EventEmitter<void>();

  itemanimref = 'in';

 // @HostBinding('@item') itemanimref = 'in';
  constructor() { }

  @HostListener('mouseenter')
  onmouseenter(){
    this.itemanimref = 'out';
  }

  @HostListener('mouseleave')
  onmouseleave(){
    this.itemanimref = 'in';
  }



  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onClick(){
      this.taskEdit.emit();
  }
  onCheckBoxClick(ev:Event){
    ev.stopPropagation();
  }

}
