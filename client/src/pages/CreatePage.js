import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom"
import useHttp from "../hooks/http.hook";
import AuthContext from "../context/AuthContext";

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [link, setLink] = useState('');
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (e) {

      }
    }
  };


  return (
    <div className={'row'}>
      <div className={'col s8 offset-s2'}>
        <div className={'card'}>
          <div className={'card-content'}>
            <div>
              <div className={'input-field'}>
                <input
                  id={'link'}
                  name={'text'}
                  type={'text'}
                  value={link}
                  placeholder={'Вставьте ссылку'}
                  onChange={(e) => setLink(e.target.value)}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="email">Ссылка</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreatePage;
