import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Box, Typography, Button } from '@mui/material';

// Material-UI imports
import {
  Container,
  TextField,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff,
  PersonAddOutlined,
} from '@mui/icons-material';

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: 'student'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    
    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    if (!formData.firstname) tempErrors.firstname = "First name is required";
    if (!formData.lastname) tempErrors.lastname = "Last name is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      const toastId = toast.loading("Creating your account...");
      axios.put('https://edu-backend-try.onrender.com/user/signup', formData)
        .then(res => {
          console.log(res.data);
          toast.dismiss(toastId);
          toast.success(
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Account created successfully!
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  boxShadow: 'none',
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  '&:hover': {
                    boxShadow: 'none',
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  },
                }}
              >
                Go to Login
              </Button>
            </Box>,
            {
              duration: 5000,
              style: {
                minWidth: '200px',
              },
            }
          );
          // Reset form after successful signup
          setFormData({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            role: 'student'
          });
        })
        .catch(err => {
          toast.dismiss(toastId);
          toast.error(err.response?.data?.message || "Signup failed. Please try again.");
          console.log(err);
        });
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
            <PersonAddOutlined sx={{ fontSize: 20 }} />
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
            Create Account
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
              autoComplete="new-password"
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
            />

            <Box sx={{ 
              display: 'flex', 
              gap: 1.5,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <TextField
                required
                fullWidth
                size="small"
                id="firstname"
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                error={!!errors.firstname}
                helperText={errors.firstname}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                required
                fullWidth
                size="small"
                id="lastname"
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                error={!!errors.lastname}
                helperText={errors.lastname}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
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
              Sign Up
            </Button>

            <Divider sx={{ my: 1.5 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
                OR
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                Already have an account?{' '}
                <Link 
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Log In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;