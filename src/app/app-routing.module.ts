import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
       path: '**',
       redirectTo: '/note'
    }, {
        path: 'note',
        loadChildren: 'app/note/note.module#NoteModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
