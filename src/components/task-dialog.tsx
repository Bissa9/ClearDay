"use client";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { EnergyLevel, TaskCategory, TaskPriority } from "@/domain/task";
import { createTask, NewTask } from "@/application/task-service";

type Props = { onClose: () => void; onCreate: (task: ReturnType<typeof createTask>) => void };
export function TaskDialog({ onClose, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("Work");
  const [priority, setPriority] = useState<TaskPriority>("normal");
  const [energy, setEnergy] = useState<EnergyLevel>("medium");
  const [minutes, setMinutes] = useState(25);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { const input: NewTask = { title, category, priority, energy, minutes }; onCreate(createTask(input)); onClose(); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not create task."); }
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="modal-heading"><div><span className="eyebrow">MAKE ROOM FOR WHAT MATTERS</span><h2 id="dialog-title">Add a task</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={19}/></button></div>
      <form onSubmit={submit} className="task-form">
        <label>What do you want to get done?<input autoFocus maxLength={100} placeholder="e.g. Finish the portfolio homepage" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <div className="form-grid"><label>Area<select value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)}><option>Work</option><option>Personal</option><option>Learning</option><option>Wellbeing</option></select></label><label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}><option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option></select></label></div>
        <div className="form-grid"><label>Energy needed<select value={energy} onChange={(e) => setEnergy(e.target.value as EnergyLevel)}><option value="low">Low energy</option><option value="medium">Steady energy</option><option value="high">Deep focus</option></select></label><label>Time needed<select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>{[5,10,15,25,30,45,60,90,120,180,240].map((n) => <option value={n} key={n}>{n} minutes</option>)}</select></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button full-button" type="submit">Add to my day <span>↗</span></button>
      </form>
    </section>
  </div>;
}
