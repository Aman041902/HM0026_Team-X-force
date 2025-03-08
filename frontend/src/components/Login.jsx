import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-hot-toast';
import { setToken, setRole, setEmail } from "../Redux/slices/authslice";

// Material-UI imports
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  LoginOutlined,
} from '@mui/icons-material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const tokendecryption = (token) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    dispatch(setRole(decodedToken.role));
    dispatch(setEmail(decodedToken.email));
    return decodedToken.role;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";

    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login submitted:", formData);
      const toastId = toast.loading("Loading")
      axios
        .post("http://localhost:3000/user/login", formData)
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          dispatch(setToken(res.data.token));
          const role = tokendecryption(res.data.token);

          if (role === "student") {
            navigate("/feed");
          } else if (role === "instructor") {
            navigate("/dashboard/instructor");
          } else {
            navigate("/dashboard/admin");
          }

          toast.success("Success")
        })
        .catch((err) => {
          toast.error(err.message)
          console.log(err);
        });
      toast.dismiss(toastId);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%, #64b5f6 100%)',
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="xs" sx={{ m: 0 }}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              boxShadow: theme.shadows[8],
              transition: 'box-shadow 0.3s ease-in-out',
            },
          }}
        >
          <Avatar sx={{ 
            m: 1, 
            bgcolor: theme.palette.primary.main,
            width: 35,
            height: 35,
          }}>
            <LoginOutlined sx={{ fontSize: 20 }} />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Welcome Back
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              width: '100%',
              '& .MuiTextField-root': { mb: 1.5 },
              '& .MuiFormControl-root': { mb: 1.5 },
            }}
          >
            <TextField
              required
              fullWidth
              size="small"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              required
              fullWidth
              size="small"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              mt: 0.5,
              mb: 1.5
            }}>
              <Link 
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1,
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: 'none',
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                '&:hover': {
                  boxShadow: 'none',
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                },
              }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 1.5 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
                OR
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                Don't have an account?{' '}
                <Link 
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
