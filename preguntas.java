public class Preguntas {

    private String[] preguntas = {
        " Me ayuda trazar o escribir a mano las palabras cuando tengo que aprenderlas de memoria",
        " Recuerdo mejor un tema al escuchar una conferencia en vez de leer un libro de texto",
        " Prefiero las clases que requiren una prueba sobre lo que se lee en el libro de texto",
        " Me gusta comer bocados y mascar chicle, cuando estudio",
        " Al prestar atencion a una conferencia, puedo recordar las ideas principales sin anotarlas",
        " Prefiero las instrucciones escritas sobre las orales",
        " Yo resuelvo bien los rompecabezas y los laberintos",
        " Prefiero las clases que requieran una prueba sobre lo que se representa durante una conferencia",
        " Me ayuda ver diapositivas y videos para comprender un tema",
        " Recuerdo mas cuando leo un libro que cuando escucho una conferencia",
        " Por lo general, tengo que escribir los numeros del telefono para recordarlos bien",
        " Prefiero recibir las noticias escuchando la radio en vez de leerlas en un periodico",
        " Me gusta tener algo como un boligrafo o un lapiz en la mano cuando estudio",
        " Necesito copiar los ejemplos de la pizarra del maestro para examinarlos mas tarde",  
        " Prefiero las instrucciones orales del maestro a aquellas escritas en un examen o en la pizarra",
        " Prefiero que un libro de texto tenga diagramas graficos y cuadros porque me ayudan mejor a entender el material",
        " Me gusta escuchar musica al estudiar una obra, novela, etc.",
        " Tengo que apuntar listas de cosas que quiero hacer para recordarlas",
        " Puedo corregir mi tarea examninandola y encontrando la mayoria de los errores",
        " Prefiero leer el periodico en vez de escuchar las noticias",
        " Puedo recordar los numeros de telefono cuando los oigo",
        " Gozo el trabajo que me exige usar la mano o herramientas",
        " Cuando escribo algo, necesito leerlo en voz alta para oir como suena",
        " Puedo recordar mejor las cosas cuando puedo moverme mientras estoy aprendiendolas por ejemplo:" +  
        "caminar al estudiaro participar en una actividad que me permita moverme, etc."
    };
    
    public static void print(Object arg) {
        System.out.println(arg);   
    }
    
    public static void main(String[] args) {
        Preguntas preguntas = new Preguntas();
        int i = 0;

        for (String pregunta : preguntas.preguntas) {
            print(Integer.toString(i) + pregunta);
            i += 1;
        }        
    }
    
}
