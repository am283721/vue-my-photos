import { DefineComponent, Plugin } from 'vue';

declare const Lightbox: DefineComponent & { install: Exclude<Plugin['install'], undefined> };
export default Lightbox;
