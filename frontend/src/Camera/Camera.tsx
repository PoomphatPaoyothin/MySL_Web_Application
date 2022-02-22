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

const OPTIONS: RecordWebcamOptions = {
  filename: "file",
  fileType: "mp4",
  width: 1920,
  height: 1080
};

const Camera = (props:any) => {
  let time = 3
  let time_start = 3
  let rand =  (0 + (Math.random() * (1000000-0))).toFixed().toString()

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
  const getRecordingFileHooks = async () => {
  const blob = await recordWebcam.getRecording();
  console.log('rand outsite is',rand)

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
          console.log('obj isssssss', obj)
          Camera_service.sendstart(obj)
          .then(res=>{
            setWord(res.ans)
            setAll_result(res.all_result)
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
  }


  const start_record=()=>{
    if(recordWebcam.status === 'PREVIEW' && statustmp == false)
    {
      recordWebcam.retake()
      setStatustmp(true)
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
  const submitword=()=>{
    const blob = recordWebcam.getRecording();

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
      setWord('กำลังประมวลผล')
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

  return (
    <div className='camera'>
      <div className="demo-section">
        <p>all_result: {all_result}</p>
        <p>คำศัพท์: {word}</p>
        <p>Camera status: {recordWebcam.status}</p>
        <div>
          <button
            disabled={
              recordWebcam.status === 'INIT' 
            }
            onClick={open_close}
          >
            {opencam}
          </button>


          <button
            disabled={
              recordWebcam.status === 'INIT' ||
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              statusprepare === true
            }
            onClick={start_record}
          >
            Start recording
          </button>

        </div>
        
        {
          statusprepare == true &&
          <div>
          Start in {counterstart}
          </div>
        }

        {
          recordWebcam.status === CAMERA_STATUS.RECORDING  && 
          <div>Countdown: {counter}</div>
        } 
        {/* <button onClick={submitword}>ตรวจสอบท่าทาง</button> */}
        <video
          ref={recordWebcam.webcamRef}
          style={{
            display: `${
              recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING 
                ? "block"
                : "none"
            }`
          }}
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
          autoPlay
          muted
          loop
        />
      </div>


    </div>
  )}

export default Camera
