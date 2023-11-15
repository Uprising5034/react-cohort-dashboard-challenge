import { useState } from "react";

import SubmitButton from "@components/SubmitButton";
import TextInput from "@components/TextInput";

import api from "@utilities/api";

export default function EditItemForm({
  formSetup,
  formData,
  setEditableItem,
  setFormData,
  setLoadItem,
  setShowItemMenu,
  setSubmitted,
  submitted,
}) {
  const [validInput, setValidInput] = useState(true)
  // console.log("formSetup", formSetup);
  // console.log("formData", formData);

  function handleSubmit(e) {
    e.preventDefault()

    if (validInput) {
      const payload = {...formData}
      api.post.put(payload.id, payload).then(() => setLoadItem(true)) // doesn't work in single post view oops

      setSubmitted(true)
      setEditableItem(false)
      setShowItemMenu(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pr-28">
      {formSetup.map((entry, index) => (
        <TextInput
          key={`edit-item-${formData.id}-${index}`}
          charLimit={entry.charLimit}
          formData={formData}
          inputName={entry.inputName}
          placeholderText={entry.placeholderText}
          required={entry.required}
          setFormData={setFormData}
          submitted={submitted}
        />
      ))}
      <SubmitButton innerText={"Edit"} submitted={submitted} />
    </form>
  );
}
