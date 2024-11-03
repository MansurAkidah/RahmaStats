import { useState } from 'react';//, ChangeEvent, FormEvent
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// MUI imports
// import Link from '@mui/material/Link';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import paths from 'routes/paths';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

// interface User {
//   email: string;
//   password: string;
// }

const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();//login,
  
  //const [user, setUser] = useState<User>({ email: '', password: '' });
  //const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
    
  //   try {
  //     setError('');
  //     setLoading(true);
  //     await login(user.email, user.password);
  //     navigate('/'); // Adjust this path as needed
  //   } catch (err) {
  //     setError('Failed to log in');
  //     console.error(err);
  //   }
  //   setLoading(false);
  // };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/'); // Adjust this path as needed
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={600}>
        Sign In
      </Typography>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} mt={4} spacing={2} width={1}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="logos:google-icon" />}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          SignIn with Google
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<IconifyIcon icon="uim:github" sx={{ mb: 0.35 }} />}
          disabled
        >
          Login with GitHub
        </Button>
      </Stack>

      {/* <Divider sx={{ my: 3 }}>or Login with</Divider> */}

      {/* <Stack onSubmit={handleSubmit} component="form" direction="column" gap={2}>
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          autoFocus
          required
          disabled={loading}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ opacity: user.password ? 1 : 0 }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <IconifyIcon icon={showPassword ? 'ion:eye' : 'ion:eye-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack mt={-1.5} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" color="primary" />}
            label="Remember me"
          />
          <Link href="#!" fontSize="body2.fontSize" letterSpacing={0.5}>
            Forgot password?
          </Link>
        </Stack>

        <Button 
          type="submit" 
          variant="contained" 
          size="medium" 
          fullWidth
          disabled={loading}
        >
          Submit
        </Button>

        <Typography
          my={3}
          color="text.secondary"
          variant="body2"
          align="center"
          letterSpacing={0.5}
        >
          Don't have an account? <Link href={paths.signup}>{'Signup'}</Link>
        </Typography>
      </Stack> */}
    </>
  );
};

export default Login;