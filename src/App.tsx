import React, {PropsWithChildren, useState} from 'react';

import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {Card, Divider} from '@rneui/base';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
import {object, number} from 'yup';

const PasswordSchema = object().shape({
  passwordLength: number()
    .min(4, 'A password should be at least 4.')
    .max(100, 'Maximum supported length is 100.')
    .required('Please determine password length.'),
});

type AlertProp = PropsWithChildren<{
  message: string;
}>;

const CustomAlert = ({message}: AlertProp): React.JSX.Element => {
  return (
    <Card containerStyle={[styles.alertStyle, styles.rounded]}>
      <Text style={{color: styles.alertStyle.color}}>{message}</Text>
    </Card>
  );
};

function App(): React.JSX.Element {
  const [options, setOptions] = useState(() => ({
    includeLowercase: false,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
  }));

  const [alert, setAlert] = useState(() => ({
    visible: false,
    message: '',
  }));

  const [generatedPassword, setGeneratedPassword] = useState(() => '');

  const generatePassword = (passwordLength: number): string => {
    if (
      !(
        options.includeLowercase ||
        options.includeUppercase ||
        options.includeNumbers ||
        options.includeSymbols
      )
    ) {
      setAlert(() => {
        setTimeout(() => {
          setAlert(prevState => ({...prevState, visible: false}));
        }, 3000);
        return {
          message: 'Please select at least one option to generate password',
          visible: true,
        };
      });

      return '';
    }

    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+=';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'acbdefghijklmnopqrstuvwxyz';
    let characterList = '';
    let password = '';

    if (options.includeLowercase) characterList += lowercase;
    if (options.includeUppercase) characterList += uppercase;
    if (options.includeNumbers) characterList += numbers;
    if (options.includeSymbols) characterList += symbols;

    for (let i = 0; i < passwordLength; i++) {
      const index = randomNumber(characterList.length);
      password += characterList[index];
    }
    return password;
  };

  const randomNumber = (interval: number): number => {
    return Math.floor(Math.random() * interval);
  };

  const resetPassword = (): void => {
    setOptions(() => ({
      includeLowercase: false,
      includeUppercase: false,
      includeNumbers: false,
      includeSymbols: false,
    }));
    setGeneratedPassword(() => '');
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <Formik
        initialValues={{passwordLength: ''}}
        validationSchema={PasswordSchema}
        onSubmit={(values, {setSubmitting}) => {
          setGeneratedPassword(() => generatePassword(+values.passwordLength));
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <View>
              <Text style={styles.heading}>Password Generator</Text>
              <Divider style={{marginHorizontal: 100, backgroundColor: '#000'}} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Password length e.g 8'}
                style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
              />
              {touched.passwordLength && errors.passwordLength && (
                <Text style={[styles.errorText, styles.errorPanel]}>
                  {errors.passwordLength}
                </Text>
              )}
            </View>

            {alert.visible && (
              <CustomAlert message={alert.message}></CustomAlert>
            )}

            <Card containerStyle={styles.rounded}>
              {Object.keys(options).length > 0 &&
                Object.entries(options).map(
                  ([optionKey, optionValue], index) => (
                    <React.Fragment key={index}>
                      <View style={styles.listItem}>
                        <BouncyCheckbox
                          fillColor="#000"
                          size={25}
                          text={optionKey.replace('include', 'Include ')}
                          isChecked={optionValue}
                          textStyle={{textDecorationLine: 'none'}}
                          onPress={(isChecked: boolean) => {
                            setOptions(prevOptions => ({
                              ...prevOptions,
                              [optionKey]: isChecked,
                            }));
                          }}
                        />
                      </View>
                      {index < Object.keys(options).length - 1 && <Divider />}
                    </React.Fragment>
                  ),
                )}
            </Card>

            {generatedPassword.length > 0 && (
              <Card containerStyle={styles.rounded}>
                <Card.Title>Generated Password</Card.Title>
                <Text selectable={true}>{generatedPassword}</Text>
              </Card>
            )}

            <View style={{marginBottom: 40}}>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={[styles.btn, styles.darkBtn]}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.lightText}>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.lightBtn]}
                  onPress={resetPassword}>
                  <Text style={styles.darkText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
  },
  darkText: {
    color: '#000',
  },
  lightText: {
    color: '#fff',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  lightBtn: {
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  darkBtn: {
    backgroundColor: '#222',
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  alertStyle: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24',
  },
  errorText: {
    color: '#e63946',
    fontSize: 12,
  },
  errorPanel: {
    paddingVertical: 5,
    paddingLeft: 5,
  },
  rounded: {
    borderRadius: 8,
  },
});
