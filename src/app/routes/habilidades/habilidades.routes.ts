import { Routes } from "@angular/router";
import { HabilidadesComponent } from "./components/habilidades/habilidades.component";
import { SkillTreeComponent } from "./components/skill-tree/skill-tree.component";

export const HABILIDADES_ROUTES: Routes = [
  { path: '', component: HabilidadesComponent },
  { path: 'arvore-interativa', component: SkillTreeComponent }
];