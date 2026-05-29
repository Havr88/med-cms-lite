import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan variables de entorno");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = {
  "Pediatría": {
    dias: "Lunes a Jueves", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lun, Mié, Jue", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Obstetricia": {
    dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Medicina Ocupacional": {
    dias: "Lun, Mié, Vie", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lun, Mar, Jue, Vie", horas_tarde: "1:00 PM a 5:00 PM"
  },
  "Ginecología": {
    dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Medicina Interna": {
    dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lun, Mié", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Cirugía General": {
    dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Traumatología": {
    dias: "Lun, Mié, Jue, Vie", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lun, Mié, Jue, Vie", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Cirugía Pediátrica": {
    dias: "Lun, Mar, Mié", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lun, Mar, Vie", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Medicina Familiar": {
    dias: "Mar, Mié, Jue, Vie", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Laboratorio Básico - Avanzada": {
    dias: "Lunes a Viernes", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Consulta Diferenciada Adolescentes": {
    dias: "Lun, Mié, Jue", horas: "7:00 AM a 12:00 PM",
    dias_tarde: "Mié, Jue", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Odontología": {
    dias: "Lunes a Viernes", horas: "8:00 AM a 12:00 PM",
    dias_tarde: "Lunes a Viernes", horas_tarde: "1:00 PM a 5:00 PM"
  },
  "Lactancia Materna": {
    dias: "Miércoles", horas: "7:00 AM a 1:00 PM",
    dias_tarde: "Mar, Vie", horas_tarde: "1:00 PM a 6:00 PM"
  },
  "Dermatología": {
    dias: "", horas: "",
    dias_tarde: "Martes", horas_tarde: "1:00 PM a 5:00 PM"
  },
  "Cirugía Oncológica": {
    dias: "", horas: "",
    dias_tarde: "Lunes", horas_tarde: "1:00 PM a 6:00 PM (Cada 15 Días)"
  }
};

async function updateData() {
  console.log("Actualizando horarios...");
  
  for (const [title, newData] of Object.entries(updates)) {
    const { error } = await supabase
      .from('servicios')
      .update(newData)
      .eq('title', title);
      
    if (error) {
      console.error(`Error actualizando ${title}:`, error);
    } else {
      console.log(`Actualizado con éxito: ${title}`);
    }
  }
  
  console.log("¡Todos los horarios han sido corregidos y divididos correctamente!");
}

updateData();
