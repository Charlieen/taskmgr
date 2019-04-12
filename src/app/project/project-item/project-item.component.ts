import { Component, OnInit, Input, Output , EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Project } from 'app/domain/project.model';
import {cardAnim} from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
      cardAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,

})
export class ProjectItemComponent implements OnInit {
  @Input() item: Project;
  @Output() onInvite = new  EventEmitter<void>();
  @Output() onEditProjectEvent = new  EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  @Output() onDeleteProjcetEvent = new  EventEmitter<void>();
  @Output() onProjectSelect = new  EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onmouseenter() {
      this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onmouseleave() {
      this.cardState = 'out';
  }

  onInviteClick(ev:Event){
      ev.stopPropagation();
      this.onInvite.emit();
  }
  onEditProject(ev:Event){
    ev.stopPropagation();
    this.onEditProjectEvent.emit();

  }
  onDeleteClick(ev:Event){
    ev.stopPropagation();
    this.onDeleteProjcetEvent.emit();
  }

  onClick(){
    this.onProjectSelect.emit();

  }
}
