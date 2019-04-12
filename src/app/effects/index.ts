import { UserEffects } from './user.effecrts';
import { AuthEffects } from './auth.effects';
import { QuoteEffects } from './quote.effects';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import { ProjectEffects } from './project.effects';
import { TaskListEffects } from './task-list.effects';
import { TaskEffects } from './task.effects';


@NgModule({
  imports: [
    EffectsModule.run(QuoteEffects),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(ProjectEffects),
    EffectsModule.run(TaskListEffects),
    EffectsModule.run(TaskEffects),
    EffectsModule.run(UserEffects)



  ]

})
export class AppEffectsModule {}
