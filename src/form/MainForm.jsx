import { useState } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik"

const MainForm = () => {
  const [pairs, setPairs] = useState([])

  return (
    <>
      <Formik
        initialValues={{ participants: [{ name: "", pairedWith: "" }] }}
        onSubmit={(values) => {
          let participants = [...values.participants]

          // Shuffle
          const shuffled = [...participants].sort(() => Math.random() - 0.5)

          // Rotate by 1 index (so nobody pairs with themselves)
          const rotated = [...shuffled.slice(1), shuffled[0]]

          // Apply pairing
          const paired = shuffled.map((person, idx) => ({
            ...person,
            pairedWith: rotated[idx].name,
          }))

          setPairs(paired)
          console.log("Final pairs:", paired)
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <FieldArray name="participants">
                {(arrayHelpers) => (
                  <>
                    {values.participants.map((participant, i) => {
                      if (i === values.participants.length - 1) {
                        return (
                          <div key={i} style={{ marginBottom: 10 }}>
                            <Field
                              key={i}
                              id="name"
                              name={`participants[${i}].name`}
                              placeholder={`Person ${i + 1} name`}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({ name: "", pairedWith: "" })
                              }
                            >
                              +
                            </button>
                          </div>
                        )
                      } else {
                        return (
                          <div key={i} style={{ marginBottom: 10 }}>
                            <Field
                              key={i}
                              id="name"
                              name={`participants[${i}].name`}
                              placeholder={`Person ${i + 1} name`}
                            />
                          </div>
                        )
                      }
                    })}
                  </>
                )}
              </FieldArray>
              {values.participants.length > 2 &&
              values.participants[2].name != "" ? (
                <button type="submit">Sort!</button>
              ) : null}
            </Form>
          )
        }}
      </Formik>

      {/* Display final pairs */}
      {pairs.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Pairings</h3>
          {pairs.map((p, i) => (
            <div key={i}>
              <strong>{p.name}</strong> → {p.pairedWith}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MainForm
