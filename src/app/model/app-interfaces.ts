export interface ScrollState {
  isScrollingUp: boolean;
  yOffset: number;
}

export interface NavbarState {
  canDragNav: boolean;
  navbarIndex: number;
}

export interface SiteSettings {
  showSettings: boolean;
  fog: boolean;
  navBarStatus: NavbarState;
  neonStatus: { visible: boolean; activeColor: string };
}


