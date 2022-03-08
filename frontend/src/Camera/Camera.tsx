import React, { useEffect, useState } from "react";
import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS
} from "react-record-webcam";
import type {
  WebcamRenderProps,
  RecordWebcamOptions,
  RecordWebcamHook
} from "react-record-webcam";
import "./styles.css";
import Camera_service from "./Camera_service";
import {useForm} from 'react-hook-form'
import { less } from "@tensorflow/tfjs";
import Lesson from "../Lesson/Lesson";
import './Camera.css'
import { Alert, Button } from "react-bootstrap";

const OPTIONS: RecordWebcamOptions = {
  filename: "file",
  fileType: "mp4",
  width: 1920,
  height: 1080
};

const Camera = (props:any) => {
  let time = 5
  let time_start = 3
  let rand =  (0 + (Math.random() * (1000000-0))).toFixed().toString()
// 
  const recordWebcam: RecordWebcamHook = useRecordWebcam(OPTIONS);
  const [lessonid, setLessonid] = useState<string>()
  const [counter, setCounter] = useState<number>(time);
  const [opencam, setOpencam] = useState<string>('Open camera')
  const [counterstart, setCounterstart] = useState<number>(time_start)
  const [statusprepare, setStatusprepare] = useState<boolean>(false)
  const [statustmp, setStatustmp] = useState<boolean>(false)
  const [statustmp2, setStatustmp2] = useState<boolean>(false)
  const [word, setWord] = useState<string>('-')
  const [all_result, setAll_result] = useState<any>()
  const [isCollect, setIsCollect] = useState<any>(false)
  const [webcamStatus, setWebcamStatus] = useState('')
  const [tmp_test, setTmp_Test] = useState('')
  const getRecordingFileHooks = async () => {
  const blob = await recordWebcam.getRecording();

    if(blob != undefined)
    {
      const data = new FormData();
      data.append('file', blob);
      Camera_service.send_video(data,rand)
      .then(res=>{
        if(res)
        {
          let obj = {
            "userid":rand,
            "catid":props.catid,
            "lessonid":lessonid
          }
          Camera_service.sendstart(obj)
          .then(res=>{
            if(webcamStatus == 'CLOSED')
            {
              init()
            }
            // zs
            else
            {
              if(props.word == 'สวย')
              if(res.ans == props.word)
              {
                setWord("ถูกต้อง")
                setIsCollect(true)
              }
              else{
                setWord("ไม่ถูกต้อง")
                setIsCollect(true)
                setTmp_Test(res.ans)
              }
              setAll_result(res.all_result)
            }
          })
        }
      })
    }

  };

  const init=()=>{
    setCounter(time)
    setStatusprepare(false)
    setCounterstart(time_start)
    setStatustmp(false)
    setWord('-')
    setIsCollect(false)
    setWebcamStatus('')
  }


  const start_record=()=>{
    if(recordWebcam.status === 'PREVIEW' && statustmp == false)
    {
      recordWebcam.retake()
      setStatustmp(true)
      setWord('-')
      setIsCollect(false)
    }
    else
    {
      if(counterstart == 0)
      {
        recordWebcam.start()
        setTimeout(() => setCounter(counter - 1), 1000)
        setCounterstart(time_start)
        setStatusprepare(false)
      }
      else
      {
        setStatusprepare(true)
        setTimeout(() => setCounterstart(counterstart - 1), 1000)
      }
    }
  }
  const open_close=()=>{
    if(recordWebcam.status == 'CLOSED')
    {
      recordWebcam.open()
      setCounter(time)
      init()
    }
    if(recordWebcam.status == 'OPEN'){
      recordWebcam.close()
      init()
    }
    if(recordWebcam.status == 'PREVIEW'){
      recordWebcam.close()
      init()
    }
    if(recordWebcam.status == 'RECORDING'){
      recordWebcam.close()
      init()
    }
  }

  useEffect(() => {
    if(statustmp2 == false)
    {
      if(counter < time && counter >0)
      {
        setTimeout(() => setCounter(counter - 1), 1000);
      } 
      if(counter == 0)
      {
        recordWebcam.stop()
        init()
      }
    }
    else
    {
      init()
    }
  }, [counter]);

  useEffect(() => {
    if(statustmp2 == false)
    {
      if(counterstart < time_start && counterstart >0)
      {
        setTimeout(() => setCounterstart(counterstart - 1), 1000);
      } 
      if(counterstart == 0)
      {
        start_record()
      }
    }
    else
    {
      init()
    }

  }, [counterstart]);

  useEffect(() => {
    if(statustmp == true && recordWebcam.status == 'OPEN')
    {
      start_record()
      setStatustmp(false)
    }
  }, [statustmp, recordWebcam.status]);

  useEffect(() => {
    if(recordWebcam.status == 'OPEN')
    {
      setOpencam('Close camera')
      setStatustmp2(false)
    }
    if(recordWebcam.status == 'CLOSED'){
      setOpencam('Open camera')
      setStatustmp2(true)
    }
    if(recordWebcam.status == 'INIT'){
      setOpencam('Opening...')
    }
    if(recordWebcam.status == 'PREVIEW')
    {
      getRecordingFileHooks()
      setWord('กำลังประมวลผล...')
      setIsCollect(true)
    }
  }, [recordWebcam.status]);

  useEffect(() => {
    Camera_service.fetchword(props.catid)
    .then(res=>{
      if(res)
      {
        for(let i=0; i<res.length; i++)
        {
          if(res[i].Word_name == props.word)
          {
            setLessonid(res[i].Lesson_ID)
          }
        }
      }
    })
  }, [props.word]);

  useEffect(() => {
    if(recordWebcam.status == 'CLOSED'){
      setWebcamStatus('CLOSED')
    }
  }, [recordWebcam.status]);
  const variantshow=()=>{
    if(word == 'ถูกต้อง'){
      return 'success'
    }
    if(word == 'กำลังประมวลผล...')
    {
      return 'info'
    }
    else{
      return 'danger'
    }
  }

  return (
    <div className='camera'>
      <div className="demo-section">
        <p className='cameraStatusShow'>Camera status: {recordWebcam.status}</p>
        { isCollect && !(recordWebcam.status === CAMERA_STATUS.RECORDING)  &&  !(statusprepare == true) &&
          <Alert  variant={variantshow()}>
              {word}
          </Alert>
        }
        {
          statusprepare == true &&
          <Alert  variant={'info'}>
              เริ่มอัดใน {counterstart}
          </Alert>
        }

        {
          recordWebcam.status === CAMERA_STATUS.RECORDING  && 
          <Alert  variant={'info'}>
              เวลาอัดที่เหลือ: {counter} วินาที
          </Alert>
        } 
        {/* <p>คำศัพท์: {word}</p> */}

        

        {/* <button onClick={submitword}>ตรวจสอบท่าทาง</button> */}
        <div className = 'videocheck'>
          <video
            ref={recordWebcam.webcamRef}
            style={{
              display: `${
                recordWebcam.status === CAMERA_STATUS.OPEN ||
                recordWebcam.status === CAMERA_STATUS.RECORDING 
                  ? "block"
                  : "none"
              }`,

            }}
            className='WebcamForlessonsizefix'
            autoPlay
            muted 
          />
          <video
            ref={recordWebcam.previewRef}
            style={{
              display: `${
                recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"
              }`
            }}
            className='WebcamForlessonsizefix'
            autoPlay
            muted
            loop
          />
        </div>
        <div>
          <Button className='oncloseButton'
            disabled={
              recordWebcam.status === 'INIT' 
            }
            onClick={open_close}
          >
            {opencam}
          </Button>


          <Button className='oncloseButton'
            disabled={
              recordWebcam.status === 'INIT' ||
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              statusprepare === true
            }
            onClick={start_record}
          >
            Start recording
          </Button>

        </div>
      </div>


    </div>
  )}

export default Camera
