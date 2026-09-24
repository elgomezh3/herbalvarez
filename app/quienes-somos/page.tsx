import type { Metadata } from "next";
import { QuienesSomosView } from "@/components/quienes-somos-view";
import { getSeccion, txt, lineas, lista, listaTexto } from "@/lib/secciones";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Herbalvarez nace de Hialuroniz, 10 años de herbolaria mexicana, ahora para boxeadores y deportistas de combate.",
};

function normStats(value: unknown): { valor: string; etiqueta: string }[] {
  return lista<Record<string, unknown>>(value, []).map((s) => ({
    valor: txt(s.valor, ""),
    etiqueta: txt(s.etiqueta, ""),
  }));
}

export default function QuienesSomosPage() {
  const c = getSeccion("quienes-somos");

  return (
    <QuienesSomosView
      eyebrow={txt(c.eyebrow, "Aceites de hierbas medicinales")}
      titulo={lineas(c.titulo, ["Quiénes", "somos."])}
      parrafoIntro={txt(
        c.parrafo_intro,
        "Herbalvarez nace de Hialuroniz, empresa 100% mexicana con 10 años de experiencia en herbolaria y marca líder en la elaboración y comercialización de aceites de hierbas medicinales. Tomamos esa misma tradición y la ponemos a trabajar para quien exige más de su cuerpo: boxeadores y deportistas de combate.",
      )}
      parrafoMision={txt(
        c.parrafo_mision,
        "Desarrollamos una línea de tratamientos 100% naturales que ponen al alcance de cada peleador los beneficios de la naturaleza — para entrenar más fuerte, recuperarse más rápido y llegar listo al día de la pelea.",
      )}
      parrafoFormula={txt(
        c.parrafo_formula,
        "Herbalvarez es una combinación de aceite de rosa mosqueta, aceite de oliva y aceite de linaza, macerados con hierbas de propiedades medicinales. El resultado es un oleato cargado de antioxidantes que ayuda a combatir el exceso de radicales libres y el estrés oxidativo que el cuerpo acumula con el entrenamiento — fortaleciendo el sistema inmunológico y apoyando la recuperación entre sesiones.",
      )}
      stats={normStats(c.stats)}
      eyebrowMexicanos={txt(c.eyebrow_mexicanos, "100% mexicanos")}
      tituloMexicanos={lineas(c.titulo_mexicanos, [
        "Hecho en México,",
        "para quien no se rinde.",
      ])}
      parrafoMexicanos={txt(
        c.parrafo_mexicanos,
        "Somos una empresa orgullosamente 100% mexicana, comprometida con la calidad y la tradición. Herbalvarez lleva esa raíz al ring: la misma herbolaria mexicana que ha dado resultados por una década, ahora enfocada en quien vive del deporte de combate.",
      )}
      eyebrowIngredientes={txt(c.eyebrow_ingredientes, "Hierbas medicinales · 100% naturales")}
      tituloIngredientes={lineas(c.titulo_ingredientes, ["Lo que lleva", "cada gota."])}
      ingredientes={listaTexto(c.ingredientes, [
        "Aceite de Rosa Mosqueta",
        "Aceite de Oliva",
        "Aceite de Linaza",
        "Oleocanthal",
        "Polifenoles",
        "Carotenos",
        "Omegas 3, 6 y 9",
        "Vitaminas",
        "Glicerina (jabón)",
      ])}
      tituloBeneficios={lineas(c.titulo_beneficios, [
        "Lo que hace cada gota",
        "por tu rendimiento.",
      ])}
      listaBeneficios={listaTexto(c.lista_beneficios, [
        "Desinflama y quita dolores",
        "Mejora la oxigenación de la sangre para que el músculo trabaje más y se fatigue menos",
        "Ayuda a bajar la inflamación post-entreno",
        "Fortalece el músculo cardíaco para aguantar más rounds",
        "Apoya la memoria y el enfoque bajo presión",
        "Acelera la recuperación entre sesiones",
      ])}
      tituloApigenina={txt(c.titulo_apigenina, "Apigenina: protección para quien recibe impacto")}
      parrafoApigenina={txt(
        c.parrafo_apigenina,
        "Materia prima para las células de Schwann, productoras de mielina — el recubrimiento que protege tus neuronas y evita los daños por los golpes continuos del entrenamiento y el ring. Entrena fuerte, protege lo que importa.",
      )}
      tituloSinergia={txt(c.titulo_sinergia, "Por qué funciona mejor junto")}
      parrafoSinergia={txt(
        c.parrafo_sinergia,
        "La piperina actúa como bio-potenciador: hace que tu cuerpo aproveche mejor el eugenol y la apigenina, con dosis pequeñas rindiendo más. Más eficiencia, menos producto.",
      )}
      ctaTexto={txt(c.cta_texto, "Ver productos")}
      ctaEnlace={txt(c.cta_enlace, "/productos")}
      fondo={txt(c.fondo, "")}
      fondoPosicion={txt(c.fondo_posicion, "50% 50%")}
    />
  );
}
