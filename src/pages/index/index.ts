const openMenu = document.getElementById('openMenu') as HTMLButtonElement;
const closeMenu = document.getElementById('closeMenu') as HTMLButtonElement;
const menu = document.getElementById('menu') as HTMLElement;

if (openMenu && closeMenu && menu) {
    openMenu.addEventListener('click', () => {
        menu.style.display = "flex";
        menu.style.right = `${menu.offsetWidth * -1}px`;
        
        setTimeout(() => {
            menu.style.opacity = '1';
            menu.style.right = "0";
            openMenu.style.display = 'none';
        }, 10);
    });

    closeMenu.addEventListener('click', () => {
        menu.style.opacity = '0';
        menu.style.right = `${menu.offsetWidth * -1}px`;
        
        setTimeout(() => {
            menu.removeAttribute('style');
            openMenu.removeAttribute('style');
        }, 200);
    });
}
