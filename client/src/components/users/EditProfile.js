import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
//import { updateUser } from "../../actions/userActions";
import { Form } from "@unform/web";
import Input from "../form/Input";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import EditIcon from "react-ionicons/lib/IosCreate";
import CloseIcon from "react-ionicons/lib/MdClose";
import Dialog from "../ui/Dialog";
import CardBody from "../ui/CardBody";
import CardHeader from "../ui/CardHeader";

export default ({ data = {} }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Nome muito curto!")
      .max(30, "Nome muito longo!")
      .required("O campo nome é obrigatório!"),
    bio: Yup.string().max(160, "Sua bio deve ter máximo 160 caracteres.!"),
    site: Yup.string().url("URL inválida!"),
    birthday: Yup.date().max(new Date(), "Tu é viajante do tempo por acaso?"),
  });

  return (
    <div>
      <Button color="primary" size="small" onClick={() => setOpen(true)}>
        <EditIcon />
        <span>Editar Perfil</span>
      </Button>

      <Dialog onClose={handleClick} show={open}>
        <Form
          initialValues={{
            name: data.name,
            bio: data.bio || "",
            currentCity: data.currentCity || "",
            site: data.site || "",
            birthday: data.birthday || "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            //props.updateUser(values);
          }}
        >
          <CardHeader>
            <div style={{display:'flex', alignItems:'center'}}>
            <IconButton onClick={handleClick}><CloseIcon /></IconButton>
            <h3>Editar Perfil</h3>
            </div>
            <Button color="secondary">Editar</Button>
          </CardHeader>
          <CardBody style={{maxWidth: 420}}>
              <Input placeholder="Nome" name="name" />
              <Input style={{marginTop: 16}} placeholder="Bio" name="bio" />
              <Input style={{marginTop: 16}} placeholder="Localização" name="currentCity" />
              <Input style={{marginTop: 16}} placeholder="Site" name="site" />
              <Input style={{marginTop: 16}} placeholder="Data de Nascimento" name="birthday" />
          </CardBody>
        </Form>
      </Dialog>
    </div>
  );
};
