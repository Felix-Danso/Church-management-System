import { AppBar, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, Link, TextField, Toolbar, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Call, Close, DragHandleRounded, Email, EmailRounded, ExpandMoreRounded, Facebook, FacebookOutlined, FacebookRounded, Favorite, Phone, PhoneAndroid, Share, Telegram, YouTube } from "@mui/icons-material";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { createUseStyles } from "react-jss";
import { Fade } from "@successtar/react-reveal";
import speaker from '../Assets/speaker.jpg'
import worship from  '../Assets/worship.jpg'
import multimedia from '../Assets/multimedia.jpg'
import children from '../Assets/children.jpg'
import usher from '../Assets/usher.jpg'
import tech from '../Assets/tech.jpg'
import prayer from '../Assets/prayer.jpg'
import AdminButtonRoute from "../AdminComponent/AdminButtonRoute";


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#111',
    },
  },
});


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = createUseStyles({
  inputRoot: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
      appearance: 'textfield',
      textAlign: 'right',
      fontSize: '3em'
    },
  },
});

function App() {

  const [openPaypal, setOpenPaypal] = useState(false);
  const [amountValue, setAmountValue] = useState(0);
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  
  // const [isPending,  setIspending] = useState(false)

  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };

  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };

  const handleChangeAmountValue = (e) => {
    const value = parseFloat(e.target.value);
    setAmountValue(value)
    console.log(amountValue);
  }

  const handleOpenPaypal = () => {
    setOpenPaypal(true)
  }
  const handleClosePaypal = () => {
    setOpenPaypal(false)
  }

  const classes = useStyles();
  

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box mt={2} sx={{
        '@media (min-width: 900px)': { // media query
          display: 'none',
        },
        textAlign: 'center'
      }}>
        <Typography variant="p" >Currently only available in desktop viewport only.</Typography>
      </Box>
      <Box className='main' sx={{
        '@media (max-width: 900px)': { // media query
          display: 'none',
        },
      }}>
        <Box className='header' sx={{ height: '100vh' }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
               St.JMC
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                <Button
                  sx={{ color: '#111' }}
                  onClick={() => scrollToSection(section1Ref)}
                  disableFocusRipple
                  disableRipple
                >
                  Home
                </Button>
                <Button
                  sx={{ color: '#111' }}
                  onClick={() => scrollToSection(section2Ref)}
                  disableFocusRipple
                  disableRipple
                >
                  About
                </Button>
                <Button
                  sx={{ color: '#111' }}
                  onClick={() => scrollToSection(section3Ref)}
                  disableFocusRipple
                  disableRipple
                >
                  Serve
                </Button>
                <Button
                  sx={{ color: '#111' }}
                  onClick={() => scrollToSection(section4Ref)}
                  disableFocusRipple
                  disableRipple
                >
                  Give
                </Button>
                <Button
                  sx={{ color: '#111' }}
                  onClick={() => scrollToSection(section5Ref)}
                  disableFocusRipple
                  disableRipple
                >
                  Contacts
                </Button>
              </Box>   
              <AdminButtonRoute width='100px' name="Admin" to="/login"/>      
            </Toolbar>
            
          </AppBar>
          <Toolbar></Toolbar>
          <Box ref={section1Ref} data-section="section1" mb={2} id="home" sx={{
            margin: 'auto', textAlign: 'center',
          }}>
            <Typography variant="h1" gutterBottom ><b>KING OF KINGS</b></Typography>
            <Typography variant="h1" gutterBottom ><b>LORD OF LORDS</b></Typography>

            <Typography variant="h4" gutterBottom >A church where <b>Christ</b> saves, heals and changes lives</Typography>
            <Button variant="outlined" color="secondary" onClick={() => scrollToSection(section2Ref)} >More about us.</Button>
          </Box>

        </Box>

        <Box className="content">
          <Box ref={section2Ref} data-section="section2" id="about" sx={{ background: '#111', height: '100vh', padding: '50px', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
            <Fade bottom>
              <Box sx={{ flexDirection: 'row', justifyContent: 'space-evenly', display: 'flex', }}>
                <Box sx={{ maxWidth: '450px' }}>
                  <Typography variant='h5' color="primary">"To win souls and make disciples."</Typography>
                  <Typography variant='h5' color="primary" sx={{ float: 'right' }} >- Mission</Typography>
                </Box>

                <Box sx={{ maxWidth: '450px' }}>
                  <Typography variant='h5' color="primary">"To make every believer a leader."</Typography>
                  <Typography variant='h5' color="primary" sx={{ float: 'right' }} >- Vision</Typography>
                </Box>
              </Box>

              <Box mt={7} sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={speaker} alt='Speaker' style={{ height: '400px', width: 'auto', maxWidth: '1200px', borderRadius: '7px' }} />
              </Box>
            </Fade>
          </Box>

          <Box ref={section3Ref} data-section="section3" id="serve" >
            <Grid container spacing={1} sx={{
            margin: 'auto', textAlign: 'center',
          }}>
                  <Grid item >
                    <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                      <CardMedia image={worship} sx={{ height: 240 }} />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Worship Team</Typography>
                        <Typography variant="p" color='#ccc'>Serve God through music</Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <ExpandMore
                          expand={expanded1}
                          onClick={handleExpandClick1}
                          aria-expanded={expanded1}
                          aria-label="show more"
                        >
                          <ExpandMoreRounded color='primary' />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded1} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph sx={{ color: '#ccc' }}>Play instruments, sing, and dance for God!</Typography>

                          <Typography paragraph sx={{ color: '#ccc' }}>
                            We are a group of passionate individuals who believe that worship is not just a formality, but an opportunity to connect with God in a personal and meaningful way. Our ministry is dedicated to leading the congregation in worship through music and singing, as well as creating an atmosphere of reverence and celebration.
                          </Typography>

                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>


                  <Grid item >
                    <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                      <CardMedia image={multimedia} sx={{ height: 240 }} />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Multimedia</Typography>
                        <Typography variant="p" color='#ccc'>The modern way of serving</Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <ExpandMore
                          expand={expanded2}
                          onClick={handleExpandClick2}
                          aria-expanded={expanded2}
                          aria-label="show more"
                        >
                          <ExpandMoreRounded color='primary' />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded2} timeout="auto" unmountOnExit>
                        <CardContent>

                          <Typography paragraph sx={{ color: '#ccc' }}>
                            We believe that God has given us all unique talents and abilities, and it is our responsibility to use them to serve Him and make a positive impact on the world. The Multimedia Ministry offers a space for individuals to do just that, by using their skills in photography, videography, graphic design, and sound production to create content that inspires and uplifts others.
                          </Typography>

                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>



                  <Grid item >
                    <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                      <CardMedia image={children} sx={{ height: 240 }} />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Childrens</Typography>
                        <Typography variant="p" color='#ccc'>Letting children be closer to God.</Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <ExpandMore
                          expand={expanded3}
                          onClick={handleExpandClick3}
                          aria-expanded={expanded3}
                          aria-label="show more"
                        >
                          <ExpandMoreRounded color='primary' />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded3} timeout="auto" unmountOnExit>
                        <CardContent>

                          <Typography paragraph sx={{ color: '#ccc' }}>
                            We believe that children are a precious gift from God, and it is our responsibility to nurture and guide them as they navigate through life. Our Children's Ministry offers a variety of programs and activities designed to meet the unique needs of children at every stage of their development.
                          </Typography>

                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>

                  <Grid item >
                    <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                      <CardMedia image={usher} sx={{ height: 240 }} />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Usher</Typography>
                        <Typography variant="p" color='#ccc'>Everyone is welcome for God.</Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <ExpandMore
                          expand={expanded4}
                          onClick={handleExpandClick4}
                          aria-expanded={expanded4}
                          aria-label="show more"
                        >
                          <ExpandMoreRounded color='primary' />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded4} timeout="auto" unmountOnExit>
                        <CardContent>

                          <Typography paragraph sx={{ color: '#555' }}>
                            Serve as the first point of contact for visitors and members alike, and their friendly and helpful demeanor sets the tone for the entire worship experience. Ushering is a ministry of hospitality. By creating a warm and welcoming atmosphere, ushers help people feel comfortable and at ease, which can make a significant impact on their experience of the worship service.
                          </Typography>

                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>

              <Grid item >
                <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                  <CardMedia image={tech} sx={{ height: 240 }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Technical Team</Typography>
                    <Typography variant="p" color='#ccc'>Everyone is welcome for God.</Typography>
                  </CardContent>
                  <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded4}
                        onClick={handleExpandClick4}
                        aria-expanded={expanded4}
                        aria-label="show more"
                    >
                      <ExpandMoreRounded color='primary' />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded4} timeout="auto" unmountOnExit>
                    <CardContent>

                      <Typography paragraph sx={{ color: '#555' }}>
                        Serve as the first point of contact for visitors and members alike, and their friendly and helpful demeanor sets the tone for the entire worship experience. Ushering is a ministry of hospitality. By creating a warm and welcoming atmosphere, ushers help people feel comfortable and at ease, which can make a significant impact on their experience of the worship service.
                      </Typography>

                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

              <Grid item >
                <Card sx={{ width: '400px', background: '#111' }} elevation={5} >
                  <CardMedia image={prayer} sx={{ height: 240 }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: '600' }} color='primary'>Prayer Force</Typography>
                    <Typography variant="p" color='#ccc'>Everyone is welcome for God.</Typography>
                  </CardContent>
                  <CardActions disableSpacing>

                    <ExpandMore
                        expand={expanded4}
                        onClick={handleExpandClick4}
                        aria-expanded={expanded4}
                        aria-label="show more"
                    >
                      <ExpandMoreRounded color='primary' />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded4} timeout="auto" unmountOnExit>
                    <CardContent>

                      <Typography paragraph sx={{ color: '#555' }}>
                        Serve as the first point of contact for visitors and members alike, and their friendly and helpful demeanor sets the tone for the entire worship experience. Ushering is a ministry of hospitality. By creating a warm and welcoming atmosphere, ushers help people feel comfortable and at ease, which can make a significant impact on their experience of the worship service.
                      </Typography>

                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>

            </Grid>
          </Box>


          <Fade bottom>
            <Box ref={section4Ref} data-section="section4" mt={7} id="give" sx={{ padding: '50px', textAlign: 'center' }}>
              <Typography variant='h4' gutterBottom >Give</Typography>
              <Typography variant='body1' gutterBottom >Generosity is a form of Worship.</Typography>
              <Box mt={2} >
                <Button variant='contained' color='secondary' sx={{ margin: '0 7px' }} onClick={handleOpenPaypal} >Paypal</Button>
              </Box>
            </Box>
          </Fade>



          <Dialog open={openPaypal} fullScreen onClose={handleClosePaypal}>
            <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleClosePaypal}>
              <Close />
            </IconButton>
            <Box
              sx={{
                margin: 'auto'
              }}
            >
              <DialogTitle><b>Give via Paypal</b></DialogTitle>
              <DialogContent>
                <Box mb={3}>
                  <TextField
                    id='amountTextField'
                    type="number"
                    color="secondary"
                    placeholder="Amount to give"
                    variant="standard"
                    value={amountValue}
                    onChange={handleChangeAmountValue}
                    className={classes.inputRoot}
                    InputProps={
                      {

                        endAdornment: <InputAdornment position="end">PHP</InputAdornment>,
                      }
                    }
                  />
                </Box>

                <PayPalScriptProvider deferLoading={!openPaypal} options={{ "client-id": "test" }}>
                  {/* {
                  isPending ? (<CircularProgress />) : ( */}
                  <PayPalButtons
                    createOrder={(data, actions) => {

                      var amounts = document.getElementById('amountTextField').value;
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: amounts,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                   {/* )
                } */}

                </PayPalScriptProvider>
              </DialogContent>
            </Box>

          </Dialog>


          <Box ref={section5Ref} data-section="section5" id="contacts" sx={{ background: '#111', padding: '50px', textAlign: 'center' }}>
            <Box mb={7}>
              <Typography color='primary' variant='h5'>Social</Typography>
              <Button href="https://www.facebook.com/NewlifeAntipolo" startIcon={<Facebook />}>Facebook</Button>
              <Button href="https://www.youtube.com/@newlifeantipolo8662" startIcon={<YouTube />}>Youtube</Button>
              <Button href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDfkBtBvKcwBHxDztJjMgVkmkhFMnVMjmZDtkmppdkNStSPgfHNMXPTPTWKdzPTgvXBDvd" startIcon={<Email />}>Email</Button>
              <Box>
                <Button disableRipple disableFocusRipple disableTouchRipple startIcon={<PhoneAndroid />}>09123456789</Button>
                <Button disableRipple disableFocusRipple disableTouchRipple startIcon={<Phone />}>8123-4567</Button>
              </Box>
            </Box>

            <Typography color='primary' variant='body1'>© Copyright 2022 by New Life Antipolo - All Rights Reserved.</Typography>
          </Box>
        </Box>

      </Box>
    </ThemeProvider >

  );
}

export default App;
