

 export interface Heroes {
    comics:      Comics;
    description: string;
    id:          string;
    fav:         boolean;
    name:        string;
    stories:     Stories;
    thumbnail:   Thumbnail;
   }

   export interface Comics {
    items:         ComicsItem[];
   }

   export interface ComicsItem {
    name:        string;
   }

   export interface Stories {
    items:         StoriesItem[];
   }

   export interface StoriesItem {
    name:        string;
   }

   export interface Thumbnail {
    extension: string;
    path:      string;
   }




