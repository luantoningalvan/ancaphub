import React, {useRef} from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileInfoRequest } from "../../actions/users";
import { Form } from "@unform/web";
import Input from "../form/Input";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import EditIcon from "react-ionicons/lib/IosCreate";
import CloseIcon from "react-ionicons/lib/MdClose";
import Dialog from "../ui/Dialog";
import CardBody from "../ui/CardBody";
import CardHeader from "../ui/CardHeader";

export default () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.profile.user)
  const handleClick = () =>  setOpen(!open);
  const editFormRef = useRef(null)
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3, "Nome muito curto!")
          .max(30, "Nome muito longo!")
          .required("O campo nome é obrigatório!"),
        bio: Yup.string().max(160, "Sua bio deve ter máximo 160 caracteres!"),
        site: Yup.string().url("URL inválida!"),
        birthday: Yup.date().max(new Date(), "Tu é viajante do tempo por acaso?").notRequired(),
      });
    
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateProfileInfoRequest(data))
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        editFormRef.current.setErrors(validationErrors);
      }
    }
  }


  return (
    <div>
      <Button color="primary" size="small" onClick={() => setOpen(true)}>
        <EditIcon />
        <span>Editar Perfil</span>
      </Button>

      <Dialog onClose={handleClick} show={open}>
        <Form
          initialData={{
            name: data.name,
            bio: data.bio || "",
            currentCity: data.currentCity || "",
            site: data.site || "",
            birthday: data.birthday && data.birthday !== null ? data.birthday.substring(0, 10) : undefined,
          }}
          onSubmit={handleSubmit}
          ref={editFormRef}
        >
          <CardHeader>
            <div style={{display:'flex', alignItems:'center'}}>
            <IconButton onClick={handleClick}><CloseIcon /></IconButton>
            <h3>Editar Perfil</h3>
            </div>
            <Button color="secondary" type="submit">Editar</Button>
          </CardHeader>
          <CardBody style={{maxWidth: 420}}>
              <Input placeholder="Nome" name="name" />
              <Input style={{marginTop: 16}} placeholder="Bio" name="bio" />
              <Input style={{marginTop: 16}} placeholder="Localização" name="currentCity" />
              <Input style={{marginTop: 16}} placeholder="Site" name="site" />
              <Input type="date" style={{marginTop: 16}} placeholder="Data de Nascimento" name="birthday" />
          </CardBody>
        </Form>
      </Dialog>
    </div>
  );
};
