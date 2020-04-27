import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import EditIcon from 'react-ionicons/lib/IosCreate';
import CloseIcon from 'react-ionicons/lib/MdClose';
import { updateProfileInfoRequest } from '../../actions/users';
import Input from '../form/Input';
import IconButton from '../ui/IconButton';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import CardBody from '../ui/CardBody';
import CardHeader from '../ui/CardHeader';

export default () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile.user);
  const handleClick = () => setOpen(!open);
  const editFormRef = useRef(null);
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(3, <FormattedMessage id="account.settings.validation.nameShort" />)
          .max(30, <FormattedMessage id="account.settings.validation.nameLong" />)
          .required(<FormattedMessage id="account.settings.validation.nameRequired" />),
        bio: Yup.string().max(160, <FormattedMessage id="account.settings.validation.maxBioLength" />),
        site: Yup.string().url(<FormattedMessage id="account.settings.validation.invalidURL" />),
        birthday: Yup.date().max(new Date(), <FormattedMessage id="account.settings.validation.invalidBirthDate" />).notRequired(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateProfileInfoRequest(data));
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
        <span>
          <FormattedMessage id="components.editProfile.heading" />
        </span>
      </Button>

      <Dialog onClose={handleClick} show={open}>
        <Form
          initialData={{
            name: data.name,
            bio: data.bio || '',
            currentCity: data.currentCity || '',
            site: data.site || '',
            birthday: data.birthday && data.birthday !== null ? data.birthday.substring(0, 10) : undefined,
          }}
          onSubmit={handleSubmit}
          ref={editFormRef}
        >
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleClick}><CloseIcon /></IconButton>
              <h3>
                <FormattedMessage id="components.editProfile.heading" />
              </h3>
            </div>
            <Button color="secondary" type="submit">
              <FormattedMessage id="common.edit" />
            </Button>
          </CardHeader>
          <CardBody style={{ maxWidth: 420 }}>
            <FormattedMessage id="common.name">
              {(msg) => <Input placeholder={msg} name="name" />}
            </FormattedMessage>
            <FormattedMessage id="common.bio">
              {(msg) => <Input style={{ marginTop: 16 }} placeholder={msg} name="bio" />}
            </FormattedMessage>
            <FormattedMessage id="nearby.location">
              {(msg) => <Input style={{ marginTop: 16 }} placeholder={msg} name="currentCity" />}
            </FormattedMessage>
            <FormattedMessage id="common.website">
              {(msg) => <Input style={{ marginTop: 16 }} placeholder={msg} name="site" />}
            </FormattedMessage>
            <FormattedMessage id="common.birthday">
              {(msg) => <Input type="date" style={{ marginTop: 16 }} placeholder={msg} name="birthday" />}
            </FormattedMessage>
          </CardBody>
        </Form>
      </Dialog>
    </div>
  );
};
