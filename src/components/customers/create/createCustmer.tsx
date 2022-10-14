import {
  Button,
  Box,
  Paper,
  Theme,
  Typography,
  TextField,
  Alert,
  AlertProps,
  IconButton,
  Collapse,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormLoadingComponent from "../../screen/FormLoading";
import Input from "../../common/input";
import InputText from "../../common/input";
import useForm from "react";
import { useClienteService } from "../../../app/services/customer/customer.service";
import { ICustomer } from "../../../app/model/ICustomer";
import { Alerrt, Message } from "../../common/message";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {},
    form: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1),
      display: "flex",
    },
    submit: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function CreateCustomer() {
  const classes = useStyles();
  const router = useRouter();
  const service = useClienteService();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [cep, setcep] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [cpfCnpj, setCpfCnpj] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [road, setRoad] = useState<string>("");
  const [messages, setMessages] = useState<Array<Alerrt>>([]);
  const [cliente, setCliente] = useState<ICustomer>({});
  const [id, setId] = useState<string>("");
  const [open, setOpen] = React.useState(true);

  // useEffect(() => {
  //   if (id) {
  //     getCustomerById(Number(id)).then((row) => {
  //       setTitle(`Editando o cliente: ${row.name}`);
  //       formik.setValues({
  //         email: row.email,
  //         name: row.name,
  //       });
  //     });
  //   }
  // }, [id]);

  const initialValues: ICustomer = {
    name: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    desc: "",
    cep: "",
    city: "",
    state: "",
    road: "",
    number: "",
    district: "",
  };

  const checkCep = (e: any) => {
    if (e.target.value?.length !== 8) {
      return;
    }
    const cep = e.target.value?.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((res) =>
      res.json().then((data) => {
        formik.setFieldValue("road", data.logradouro);
        formik.setFieldValue("city", data.localidade);
        formik.setFieldValue("state", data.uf);
        formik.setFieldValue("district", data.bairro);
      })
    );
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Obrigatório")
      .min(2, "O nome deve ter no minimo 2 caracteres"),
    email: Yup.string().email("E-mail invalido").required("Obrigatorio"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (cliente) => {
      if (id) {
        service.atualizar(cliente).then((response) => {
          formik.setFieldValue("open",true)
          setMessages([
            {
              color: "success",
              texto: "Cliente atualizado com sucesso!",
            },
          ]);
        });
      } else {
        service
          .salvar(cliente)
          .then((clienteResposta) => {
            setId(clienteResposta.id!);
            formik.setFieldValue("open",true)
            setMessages([
              {
                color: "success",
                texto: "Cliente Salvo com sucesso!",
              },
            ]);
            formik.resetForm();
          })
          .catch((err) => {
            const field = err.path;
            const message = err.message;
          });
      }
    },
  });

  return (
    <Box>
      <Paper className={`${classes.form} bg-gray-10 `} elevation={3}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div>
            {messages &&
              messages.map((msg: any) => (
                <> 
                <Collapse in={open}>
                
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity={msg.color}
                  >
                    {msg.texto}
                  </Alert>
                </Collapse>
                </>
              ))}
          </div>
          <Box>
            <Typography className=" text-lg ">Cadastro de clientes:</Typography>
          </Box>
          <Box className=" lg:columns-2   ">
            <Box>
              <Box className=" ">
                <InputText
                  size="small"
                  variant="outlined"
                  id="name"
                  label="Nome"
                  fullWidth={true}
                  name="name"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  error={formik.touched.name}
                  error2={Boolean(formik.errors.name)}
                  helperTouched={formik.touched.name}
                  helperErrors={formik.errors.name}
                  value={formik.values.name}
                ></InputText>
                <InputText
                  fullWidth={true}
                  size="small"
                  variant="outlined"
                  id="email"
                  type="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  error={formik.touched.email}
                  error2={Boolean(formik.errors.email)}
                  helperTouched={formik.touched.email}
                  helperErrors={formik.errors.email}
                  value={formik.values.email}
                ></InputText>
              </Box>
              <Box>
                <InputText
                  fullWidth={false}
                  type="text"
                  size="small"
                  variant="outlined"
                  id="cpfCnpj"
                  label="Cpf - CNPJ"
                  name="cpfCnpj"
                  autoComplete="cpfCnpj"
                  onChange={formik.handleChange}
                  error={formik.touched.cpfCnpj}
                  error2={Boolean(formik.errors.cpfCnpj)}
                  helperTouched={formik.touched.cpfCnpj}
                  helperErrors={formik.errors.cpfCnpj}
                  value={formik.values.cpfCnpj}
                ></InputText>
                <InputText
                  fullWidth={false}
                  type="text"
                  size="small"
                  variant="outlined"
                  id="phone"
                  label="Telefone"
                  name="phone"
                  autoComplete="phone"
                  onChange={formik.handleChange}
                  error={formik.touched.phone}
                  error2={Boolean(formik.errors.phone)}
                  helperTouched={formik.touched.phone}
                  helperErrors={formik.errors.phone}
                  value={formik.values.phone}
                ></InputText>
                <InputText
                  fullWidth={true}
                  size="small"
                  variant="outlined"
                  id="desc"
                  label="Observações"
                  name="desc"
                  autoComplete="desc"
                  onChange={formik.handleChange}
                  error={formik.touched.desc}
                  error2={Boolean(formik.errors.desc)}
                  helperTouched={formik.touched.desc}
                  helperErrors={formik.errors.desc}
                  value={formik.values.desc}
                ></InputText>
              </Box>
            </Box>

            <Box>
              <Box className=" columns-2 ">
                <TextField
                  className={` p-1 `}
                  size="small"
                  variant="outlined"
                  onBlur={checkCep}
                  margin="normal"
                  id="cep"
                  type="number"
                  label="Cep"
                  name="cep"
                  autoComplete="cep"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.cep}
                  error={formik.touched.cep && Boolean(formik.errors.cep)}
                  helperText={formik.touched.cep && formik.errors.cep}
                />

                <InputText
                  fullWidth={false}
                  size="small"
                  variant="outlined"
                  id="city"
                  type="text"
                  label="Cidae"
                  name="city"
                  autoComplete="city"
                  onChange={formik.handleChange}
                  error={formik.touched.city}
                  error2={Boolean(formik.errors.city)}
                  helperTouched={formik.touched.city}
                  helperErrors={formik.errors.city}
                  value={formik.values.city}
                ></InputText>
                <InputText
                  fullWidth={false}
                  type="text"
                  size="small"
                  variant="outlined"
                  id="state"
                  label="Estado"
                  name="state"
                  autoComplete="state"
                  onChange={formik.handleChange}
                  error={formik.touched.state}
                  error2={Boolean(formik.errors.state)}
                  helperTouched={formik.touched.state}
                  helperErrors={formik.errors.state}
                  value={formik.values.state}
                ></InputText>
                <InputText
                  fullWidth={false}
                  type="text"
                  size="small"
                  variant="outlined"
                  id="district"
                  label="Bairro"
                  name="district"
                  autoComplete="district"
                  onChange={formik.handleChange}
                  error={formik.touched.district}
                  error2={Boolean(formik.errors.district)}
                  helperTouched={formik.touched.district}
                  helperErrors={formik.errors.district}
                  value={formik.values.district}
                ></InputText>
              </Box>
              <Box>
                <InputText
                  fullWidth={true}
                  size="small"
                  variant="outlined"
                  id="road"
                  label="Rua"
                  name="road"
                  autoComplete="road"
                  onChange={formik.handleChange}
                  error={formik.touched.road}
                  error2={Boolean(formik.errors.road)}
                  helperTouched={formik.touched.road}
                  helperErrors={formik.errors.road}
                  value={formik.values.road}
                ></InputText>
                <InputText
                  fullWidth={false}
                  size="small"
                  variant="outlined"
                  id="number"
                  label="Número"
                  name="number"
                  autoComplete="number"
                  onChange={formik.handleChange}
                  error={formik.touched.number}
                  error2={Boolean(formik.errors.number)}
                  helperTouched={formik.touched.number}
                  helperErrors={formik.errors.number}
                  value={formik.values.number}
                ></InputText>
              </Box>
            </Box>
          </Box>
          <Box>
            <Button
              className={` bg-blue-400 mt-4`}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              {id ? "Atualizar" : "Salvar"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
