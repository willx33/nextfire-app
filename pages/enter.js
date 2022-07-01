import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';


export default function Enter(props) {
  const {user , username } = useContext(UserContext)

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
      <main> 
        {user ? 
        ! username ? <UsernameForm /> : <SignOutButton /> 
        :
        <SignInButton />
        }
      </main>
  )
}

// Sign in With Google Button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
    };
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign In With Google
    </button>

    );
  }

// Sign Out Button 
function SignOutButton() {
  return <button onClick ={() => signOut(auth)}>Sign Out</button>
}


//username Form
function UsernameForm() {
  const [formValue, setFormValue ] = useState(' ');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user, username} = useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue] );

const onChange = (e) => {
  //force form value typed in form to match correccct format
  const val = e.target.value.toLowerCase();
  const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

  //only set form value if length is < 3 OR it passes regex
  if (val.length < 3) {
    setFormValue(val);
    setLoading(false);
    setIsValid(false);
  }

  if (re.test(val)) {
    setFormValue(val);
    setLoading(true);
    setIsValid(false);
  }
};

    //hit the database for username match after each debounced change
    // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce (async (username ) => {
    if (username.length >= 3) {
      const ref = firestore.doc('usernames/${username}');
      const { exists } = await ref.get();
      console.log(' Firestore read executed! ');
      setIsValid(!exists);
      setLoading(false);
    }
  }, 500),
    []
  );


  return ( 
    !username && (
      <section>
        <h3>Choose Username 
          <form onSubmit={onSubmit}>
              <input name="username" placeholder="username" value={formvalue} onChange={onChange} />

              <button type="submit" className="btn-green" disabled={!isValid}>
                Choose
              </button>

              //debug state because it changes alot
              <h3>Debug state</h3>
              <div>
                username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
              </div>
          </form>
        </h3>
      </section>
    )
  );
}