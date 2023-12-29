import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Button } from '@mui/base/Button';
import { Input as BaseInput, InputProps, inputClasses } from '@mui/base/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IFieldCreateNew } from '../field-create/field-create-new';
import { IFieldObj, IInputAdorments } from '../../utils/types';


export const Input = React.forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const { slots, ...other } = props;
    return (
        <BaseInput
            slots={{
                root: InputRoot,
                input: InputElement,
                ...slots,
            }}
            {...other}
            ref={ref}
        />
    );
});

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export const InputAdornments: React.FC<IInputAdorments> = ({
    keyInput,
    idInput,
    placeholderInput,
    valueInput,
    onChangeInput,
    typeInput,
    nameInput,
    ariaLabelInput,
    passwordInput = false
}) => {
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Input
            key={keyInput}
            id={idInput}
            type={!values.showPassword && typeInput === 'password' ? 'password' : 'text'}
            value={valueInput}
            onChange={onChangeInput}
            name={nameInput}
            placeholder={placeholderInput}
            endAdornment={typeInput === 'password' ?
                <InputAdornment>
                    <IconButton
                        size="small"
                        aria-label={ariaLabelInput}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {values.showPassword ? (
                            <VisibilityOff fontSize="small" />
                        ) : (
                            <Visibility fontSize="small" />
                        )}
                    </IconButton>
                </InputAdornment> : null
            }
        />



    );
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputRoot = styled('div')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElement = styled('input')(
    ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`,
);

const IconButton = styled(Button)(
    ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[700]};
  `,
);

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;