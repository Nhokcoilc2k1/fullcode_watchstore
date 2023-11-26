import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import classNames from "classnames/bind";
import styles from './CreateProduct.module.scss';

const cx = classNames.bind(styles)

 function MarkdownEditor({label, value, changValue, name, invalidFields, setInvalidFields}) {

  return (
    <div className={cx('mark-wrap')}>
        <span className={cx('mark-label')}>{label}</span>
      <Editor
        apiKey='hek4zkguutvgxvtw0w4qkjdb435ykvto5rblkw0t67n18agd'
        initialValue={value}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e => changValue(prev => ({...prev, [name]: e.target.getContent()}))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
        {/* {invalidFields?.some(el => el.name === name)} && <small>{invalidFields.find(el => el.name = name)?.message}</small> */}
    </div>
  );
}

export default memo(MarkdownEditor);
