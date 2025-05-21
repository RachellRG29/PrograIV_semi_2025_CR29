// Función para inicializar la búsqueda cuando el contenido esté listo
function initializeRecipeSearch() {
  const { createApp } = Vue;
  
  const app = createApp({
    data() {
      return {
        searchQuery: '',
        allRecipes: []
      }
    },
    methods: {
      setupSearch() {
        console.log('Configurando búsqueda...');
        
        // Elementos del DOM
        const container = document.querySelector('.grid-container-recetas');
        const searchInput = document.querySelector('.input_busqueda');
        const recipeCards = Array.from(document.querySelectorAll('.tarjeta-receta'));
        
        if (!container || !searchInput || recipeCards.length === 0) {
          //console.error('Elementos necesarios no encontrados');
          return false;
        }
        
        // Guardar datos de recetas
        this.allRecipes = recipeCards.map(card => ({
          element: card,
          title: card.querySelector('.title-tarjeta')?.textContent?.trim() || '',
          description: card.querySelector('.descripcion-tarjeta')?.textContent?.trim() || '',
          time: card.querySelector('.lbl_tiempo_receta')?.textContent?.trim() || '',
          difficulty: card.querySelector('.lbl_dificultad')?.textContent?.trim() || '',
          originalClass: card.className
        }));
        
        // Event listener para búsqueda
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase();
          this.filterRecipes();
        });
        
        //console.log('Búsqueda configurada correctamente');
        return true;
      },
      filterRecipes() {
        if (this.allRecipes.length === 0) return;
        
        // Resetear todas las tarjetas
        this.allRecipes.forEach(recipe => {
          recipe.element.className = recipe.originalClass;
          recipe.element.style.order = '';
        });
        
        if (!this.searchQuery.trim()) return;
        
        // Aplicar filtro
        this.allRecipes.forEach(recipe => {
          const matches = (
            recipe.title.toLowerCase().includes(this.searchQuery) ||
            recipe.description.toLowerCase().includes(this.searchQuery) ||
            recipe.time.toLowerCase().includes(this.searchQuery) ||
            recipe.difficulty.toLowerCase().includes(this.searchQuery)
          );
          
          if (matches) {
            recipe.element.classList.add('receta-destacada');
            recipe.element.style.order = '-1';
          }
        });
      }
    },
    mounted() {
      // Intentar configurar inmediatamente
      if (!this.setupSearch()) {
        //console.log('Esperando carga de contenido...');
      }
    }
  });
  
  // Montar la aplicación
  app.mount('#app-search');
 // console.log('Aplicación Vue inicializada');
}

// Observador para contenido dinámico
function setupContentObserver() {
  const targetNode = document.getElementById('contenido-principal');
  if (!targetNode) {
   // console.error('No se encontró el contenedor principal');
    return;
  }
  
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        // Verificar si se cargó pp_recetas.html
        if (document.querySelector('.section_recetas_pp')) {
          //console.log('Contenido de recetas detectado');
          initializeRecipeSearch();
          observer.disconnect();
          break;
        }
      }
    }
  });
  
  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });
  
  //console.log('Observer configurado para contenido dinámico');
}

// Iniciar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el contenido ya está cargado (recarga de página)
  if (document.querySelector('.section_recetas_pp')) {
    initializeRecipeSearch();
  } else {
    setupContentObserver();
  }
});