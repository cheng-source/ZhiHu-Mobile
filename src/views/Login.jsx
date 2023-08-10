import React, { useState,useEffect } from "react";
import {Form,Input,Button, Toast} from 'antd-mobile'
import ButtonAgain from "../component/ButtonAgain";
import NavBarAgain from "../component/NavBarAgain";
import api from "../api";
import './Login.less';
import _ from '../assets/utils'

const validator = {
  phone(_, value) {
    value = value.trim();
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (value.length === 0) return Promise.reject(new Error('手机号不能为空！'));
    if(!reg.test(value)) return Promise.reject(new Error('手机号格式错误！'));
    return Promise.resolve();
  },
  
  code(_, value) {
    value = value.trim();
    let reg = /^\d{6}$/;
    if (value.length === 0) return Promise.reject(new Error('验证码不能为空！'));
    if(!reg.test(value)) return Promise.reject(new Error('验证码格式错误！'));
    return Promise.resolve();
  }
}

const Login = function() {
  const [sendText, setSendText] = useState('发送验证码'),
        [disable, setDisable] = useState(false);
  
  const [formIns] = Form.useForm();
        
  const submit = async (values) => {
    try {
      await formIns.validateFields();
      let {phone, code} = formIns.getFieldsValue();
      let {code: codeHttp, token} = await api.login(phone,code);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '登陆失败',
        });
        formIns.resetFields(['code']);
        return;
      }
      // 登陆成功：存储Token、存储登录者信息到redux、提示、跳转
      _.storage.set('tk', token);

    } catch (error) {
      
    }
    
  }
  // 组件销毁时，清除定时器
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  },[]);

  const delay = (internal) => {
    return new Promise( resolve => {
      setTimeout(() => {
        resolve();
      }, internal);
    })
  }
  let timer = null,
      num = 31;
  const countdown = () => {
    num--;
    if (num === 0) {
      clearInterval(timer);
      timer = null;
      console.log(num);
      setSendText('发送验证码');
      setDisable(false);
    } else {
      setSendText(`${num}后重发`);
    }
    
  }
  const send = async ()=> {
    try {
      await formIns.validateFields(['phone'])
      let phone = formIns.getFieldValue('phone');
      let {code} = await api.sendPhoneCode(phone);
      console.log(code);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '发送失败'
        });
        return;
      }
      setDisable(true);
      countdown();
      if (!timer) timer = setInterval(countdown, 1000);
    } catch (error) {
      
    }
  }


  return <div className="login-box">
         <NavBarAgain title={'登录'} />
          <Form 
            layout='horizontal' 
            style={{'--border-top': 'none'}} 
            footer={
              // <Button  type='submit' size='large' shape='rectangular' color='primary'>登录</Button>
              <ButtonAgain type='submit' size='large' shape='rectangular' color='primary' onClick={submit}>登录</ButtonAgain>
            }
            // onFinish={submit}
            form={formIns}
            initialValues={{phone: '', code: ''}}
          >
        <Form.Item
          name='phone'
          label='手机号'
          rules={[{
            validator: validator.phone
          }]}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>

        <Form.Item name='code' label='短信验证码' extra={
              // <Button size="small" color="primary" onClick={send}>发送验证码</Button>
              <ButtonAgain size="small" color="primary" disable={disable} onClick={send}>{sendText}</ButtonAgain>
            }
            rules={[{
              validator: validator.code
            }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>

  </div>
}

export default Login;