import { ItemOption } from '@infrastructure/interfaces';

export abstract class ThemeServiceContract {
    public abstract get THEME_OPTIONS(): ItemOption[];
}