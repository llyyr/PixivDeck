// @flow
import React, { Component } from 'react'
import { connect, type Connector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import type { State, Dispatch } from 'types'
import type { ModalType } from './reducer'
import { closeModal } from './actions'
import LoginModal from '../../components/LoginModal'
import SettingModal from '../../components/SettingModal'
import AddColumnModal from '../../components/AddColumnModal'
import ModalWrapper from './ModalWrapper'
import { makeSelectType, makeSelectOpen } from './selector'

type Props = {
  type: ModalType,
  open: boolean,
  closeModal: () => void,
}

function Modal({ type, open, closeModal }: Props) {
  const renderModal = (type: ModalType) => {
    if (type === 'AddColumn') {
      return <AddColumnModal />
    } else if (type === 'Setting') {
      return <SettingModal />
    } else if (type === 'Login') {
      return <LoginModal />
    }
    return <AddColumnModal />
  }

  return (
    <ModalWrapper onClose={closeModal} open={open}>
      {renderModal(type)}
    </ModalWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  open: makeSelectOpen(),
  type: makeSelectType(),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal() {
    dispatch(closeModal())
  },
})

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default connector(Modal)